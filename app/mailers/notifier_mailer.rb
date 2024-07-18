class NotifierMailer < ApplicationMailer
    def approved_message(email, process_date, a1_form_id, clerk_full_name, form_number)
        @email = email
        @process_date = process_date
        @a1_form_id = a1_form_id
        @clerk_full_name = clerk_full_name
        @form_number = form_number

        mail(
            to: email,
            subject: "Zahtev odobren"
        )
    end

    def rejected_message(email, process_date, a1_form_id, clerk_full_name, comment)
        @email = email
        @process_date = process_date
        @a1_form_id = a1_form_id
        @clerk_full_name = clerk_full_name
        @comment = comment

        mail(
            to: email,
            subject: "Zahtev odbijen"
        )
    end
end
