# frozen_string_literal: true

class A1FormsController < ApplicationController
    before_action :authenticate_user!
    before_action :check_if_citizen!, only: [:create]
    before_action :check_if_clerk!, only: [:process_form]

    def index
        if current_user.is_citizen?
            a1_forms = A1Form.where(user: current_user)
        elsif current_user.is_clerk?
            a1_forms = A1Form.all
        end

        render :xml => a1_forms
    end

    def show
        a1_form = A1Form.find(params[:id])

        if a1_form.present?
            render :xml => a1_form
        else 
            render xml: {
                message: "A1 form not found"
            }.to_xml(root: :message),
            status: :not_found
        end
    end

    def create
        a1_form = A1Form.new(a1_form_params)
        a1_form.user = current_user

        if a1_form.save!
            render :xml => a1_form.to_xml
        else
            render :xml => a1_form.errors.messages, status: :unprocessable_entity   
        end
    end

    def search
        a1_forms = A1Form.search(params[:search])

        if current_user.is_citizen?
            a1_forms = a1_forms.approved
        elsif current_user.is_clerk?
            a1_forms = a1_forms.review
        end

        render :xml => a1_forms
    end

    def process_form
        process_params = a1_form_process_params

        a1_form = A1Form.find_by(id: process_params[:id])

        if a1_form.nil? || a1_form.status != A1Form::REVIEW
            render :xml => {:error => "A1 form not found"}.to_xml(root: :message), status: :not_found
        else
            a1_form.status = process_params[:status] 
            a1_form.comment = process_params[:comment] 
            a1_form.processed_at = DateTime.current
            a1_form.processed_by = current_user
            if a1_form.save
                clerk_full_name = "#{current_user.first_name} #{current_user.last_name}"

                if a1_form.status == A1Form::APPROVED
                    NotifierMailer.approved_message(
                        a1_form.user.email,
                        a1_form.processed_at,
                        a1_form.id,
                        clerk_full_name).deliver_later
                elsif a1_form.status == A1Form::REJECTED
                    NotifierMailer.rejected_message(
                        a1_form.user.email,
                        a1_form.processed_at,
                        a1_form.id,
                        clerk_full_name,
                        a1_form.comment).deliver_later
                end

                render :xml => a1_form
            else
                render :xml => {:error => "An error occured while processing a1 form"}.to_xml(root: :message), status: :unprocessable_entity
            end
        end
    end

    private

    def a1_form_params
        params.require(:a1_form).permit(
            :submitter,
            :pseudonym,
            :proxy,
            :art_title,
            :art_data,
            :art_type,
            :art_format,
            :author_data,
            :created_during_employment,
            :use_intentions
        )
    end

    def a1_form_process_params
        params.require(:a1_form).permit(
            :id,
            :status,
            :comment
        )
    end

    def check_if_citizen!
        if !current_user.is_citizen?
            action_not_allowed
        end
    end

    def check_if_clerk!
        if !current_user.is_clerk?
            action_not_allowed
        end
    end
end
