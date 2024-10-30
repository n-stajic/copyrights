class A1Form
    include Mongoid::Document
    include Mongoid::Timestamps
    include ActiveModel::Serializers::Xml

    REVIEW = "in_review"
    APPROVED = "approved"
    REJECTED = "rejected"
    STATUSES = [REVIEW, APPROVED, REJECTED].freeze

    validates :submitter, :art_title, :art_type, :art_format, :form_number, presence: true
    validates :form_number, uniqueness: true
    validates :status, inclusion: { in: STATUSES }

    before_validation :set_form_number, on: [:create]

    field :form_number,               type: String
    field :submitter,                 type: String
    field :pseudonym,                 type: String
    field :proxy,                     type: String
    field :art_title,                 type: String
    field :art_data,                  type: String
    field :art_type,                  type: String
    field :art_format,                type: String
    field :author_data,               type: String
    field :created_during_employment, type: String
    field :use_intentions,            type: String
    field :aditional_data,            type: String
    field :status,                    type: String, default: REVIEW
    field :processed_at,              type: Date
    field :comment,                   type: String
    belongs_to :user
    belongs_to :processed_by, class_name: User, optional: true

    scope :approved, -> () { where(status: APPROVED) }
    scope :review, -> () { where(status: REVIEW) }

    def self.search(search_param)
        search_phrase = /#{Regexp.escape(search_param)}/i

        A1Form.where(submitter: search_phrase).
            or(pseudonym: search_phrase).
            or(proxy: search_phrase).
            or(art_title: search_phrase).
            or(art_data: search_phrase).
            or(art_type: search_phrase).
            or(art_format: search_phrase).
            or(author_data: search_phrase).
            or(created_during_employment: seaA1Formrch_phrase).
            or(use_intentions: search_phrase).
            or(aditional_data: search_phrase).
            or(comment: search_phrase)
    end

    private
    
    def set_form_number
        if self.form_number.nil?
            self.form_number = "A-" + rand(10000000..99999999).to_s
        end
    end
end
