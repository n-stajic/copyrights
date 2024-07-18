# frozen_string_literal: true

class A1FormsController < ApplicationController
    before_action :authenticate_user!
    before_action :check_if_citizen!, only: [:create]
    before_action :check_if_clerk!, only: [:process_form, :generate_report]

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
            a1_form = A1FormService::process_a1_form(a1_form, process_params[:status], process_params[:comment])

            if a1_form.present?
                render :xml => a1_form
            else
                render :xml => {:error => "An error occured while processing a1 form"}.to_xml(root: :message), status: :bad_request
            end
        end
    end

    def xhtml_download
        a1_form = A1Form.find(params[:id])

        report = ReportService.generate_a1_from_xhtml(a1_form)

        send_data report,
            filename: "#{a1_form.art_title}_#{a1_form.id}.xhtml",
            type: "application/xhtml+xml"
    end

    def pdf_download
        a1_form = A1Form.find(params[:id])

        report = ReportService.generate_a1_from_pdf(a1_form)
        
        send_data report,
            filename: "#{a1_form.art_title}_#{a1_form.id}.pdf",
            type: "application/pdf"
    end

    def generate_report
        if params[:start_data].present? && params[:end_date].present?
            report = ReportService.generate_clerk_report(params[:start_data], params[:end_date])

            send_data report,
            filename: "#{a1_form.art_title}_#{a1_form.id}.pdf",
            type: "application/pdf"
        else
            render :xml => {:error => "Start date or end date is missing"}.to_xml(root: :message), status: :bad_request
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
