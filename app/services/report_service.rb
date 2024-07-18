class ReportService
    def self.generate_clerk_report(start_data, end_date)
        submited_request_number = A1Form.where("created_at > #{start_data} AND created_at < #{end_date}").count
        approved_request_number = A1Form.where("created_at > #{start_data} AND created_at < #{end_date}").
                                         where(status: A1Form::APPROVED).count
        rejected_request_number = A1Form.where("created_at > #{start_data} AND created_at < #{end_date}").
                                         where(status: A1Form::REJECTED).count

        Prawn::Document.new do
            font Rails.root.join("app/assets/fonts/OpenSans-Regular.ttf")
            text "Izveštaj za period #{start_data} - #{end_date}", align: :center
            text "Broj podnetih zahteva: #{submited_request_number}"
            text "Broj prihvaćenih zahteva: #{approved_request_number}"
            text "Broj odbijenih zahteva: #{rejected_request_number}"
        end.render
    end

    def self.generate_a1_from_pdf(a1_form)
        submitter_text = "Podnosilac - ime, prezime, adresa i državljansto autra ili drugog nosioca autorskog prava ako je podnosilac fizičko lice, " +
            "odnosno poslovno ime i sedište nosioca autorskog prava ako je podnosilac pravno lice"
        art_data_text = "Podaci o naslovu autorksog dela na kome se zasniva delo prerade, ako je u pitanju autorsko delo prerade, " +
            "kao i podatak o autoru izvornog dela"
        author_data_text = "Podaci o autoru ako podnosilac prijave iz tačke 1. ovog zahteva nije autor i to: " +
            "prezime, ime, adresa i državljanstvo autora (grupe autora ili koautora), ako su u pitanju jedan ili više " +
            "autora koji nisu živi, imena autora i godina smrti autora a ako je u pitanju autorsko delo anonimnog autora " +
            "navod da je autorsko delo delo anonimnog autora"

        Prawn::Document.new do
            font Rails.root.join("app/assets/fonts/OpenSans-Regular.ttf")
            text "Obrazac A-1\n\n", align: :center
            text "Zahtev za unošenje u evidenciju i deponovanje autorskog dela\n\n", align: :center
            text "#{submitter_text}:\n#{a1_form.submitter}\n\n"
            text "Pseudonim ili znak autora, (ako ga ima):\n#{a1_form.pseudonym}\n\n"
            text "Ime, przime i adresa punomoćnika, ako se prijava podnosi preko punomoćnika:\n#{a1_form.proxy}\n\n"
            text "Naslov autorskog dela, odnosno alternativni naslov, ako ga ima, po kome autorsko delo može da se identifikuje:\n#{a1_form.art_title}\n\n"
            text "#{art_data_text}:\n#{a1_form.art_data}\n\n"
            text "Podaci o vrsti autorskog dela (književno delo, muzičko delo, likovno delo, računarski program i dr.):\n#{a1_form.art_type}\n\n"
            text "Podaci o formi zapisa autorskog dela (štampani tekst, optički disk i slično):\n#{a1_form.art_format}\n\n"
            text "#{author_data_text}:\n#{a1_form.author_data}\n\n"
            text "Podatak da li je autorsko delo stvoreno u radnom odnosu:\n#{a1_form.created_during_employment}\n\n"
            text "Način korišćenja autorskog dela ili nameravani način korišćenja autorskog dela:\n#{a1_form.use_intentions}\n\n"
            text "Podnosilac prijave, nosilac prava:\n#{a1_form.user.email}\n\n"
            text "Prilozi koji se podnose uz zahtev:\n#{a1_form.aditional_data}\n\n"
            text "Broj prijave:\n#{a1_form.form_number}\n\n"
            text "Datum podnošenja:\n#{a1_form.created_at}"
        end.render
    end

    def self.generate_a1_from_xhtml(a1_form)
        file_text = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">'
        file_text += '<html xmlns="http://www.w3.org/1999/xhtml">'
        file_text += "<head>"
        file_text += "<title>A1 Form</title>"
        file_text += "</head>"
        file_text += "<body>"
        file_text += "<a1_form>"
        file_text += "<form_number>#{a1_form.form_number}</form_number>"
        file_text += "<submitter>#{a1_form.submitter}</submitter>"
        file_text += "<pseudonym>#{a1_form.pseudonym}</pseudonym>"
        file_text += "<proxy>#{a1_form.proxy}</proxy>"
        file_text += "<art_title>#{a1_form.art_title}</art_title>"
        file_text += "<art_data>#{a1_form.art_data}</art_data>"
        file_text += "<art_type>#{a1_form.art_type}</art_type>"
        file_text += "<art_format>#{a1_form.art_format}</art_format>"
        file_text += "<author_data>#{a1_form.author_data}</author_data>"
        file_text += "<created_during_employment>#{a1_form.created_during_employment}</created_during_employment>"
        file_text += "<use_intentions>#{a1_form.use_intentions}</use_intentions>"
        file_text += "<aditional_data>#{a1_form.aditional_data}</aditional_data>"
        file_text += "<status>#{a1_form.status}</status>"
        file_text += "<processed_at>#{a1_form.processed_at}</processed_at>"
        file_text += "<comment>#{a1_form.comment}</comment>"
        file_text += "<created_at>#{a1_form.created_at}</created_at>"
        file_text += "<updated_at>#{a1_form.updated_at}</updated_at>"
        file_text += "<user_id>#{a1_form.user_id}</user_id>"
        file_text += "<processed_by>#{a1_form.processed_by}</processed_by>"
        file_text += "</a1_form>"
        file_text += "</body>"
        file_text += "</html>"

        file_text
    end
end
