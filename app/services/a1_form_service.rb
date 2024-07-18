class A1FormService
    def process_a1_form(a1_form, status, comment)
        a1_form.status = status
        a1_form.comment = comment
        a1_form.processed_at = DateTime.current
        a1_form.processed_by = current_user

        if a1_form.save
            clerk_full_name = "#{current_user.first_name} #{current_user.last_name}"

            if a1_form.status == A1Form::APPROVED
                NotifierMailer.approved_message(
                    a1_form.user.email,
                    a1_form.processed_at,
                    a1_form.id,
                    clerk_full_name
                    a1_form.form_number
                ).deliver_later
            elsif a1_form.status == A1Form::REJECTED
                NotifierMailer.rejected_message(
                    a1_form.user.email,
                    a1_form.processed_at,
                    a1_form.id,
                    clerk_full_name,
                    a1_form.comment
                ).deliver_later
            end

            return a1_form
        end

        return nil
    end
end
