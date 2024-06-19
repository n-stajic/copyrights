class User
    include Mongoid::Document
    include Mongoid::Timestamps
    include ActiveModel::Serializers::Xml
    include Devise::JWT::RevocationStrategies::JTIMatcher
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable,
           :jwt_authenticatable, jwt_revocation_strategy: self

    CITIZEN = "citizen"
    CLERK = "clerk"
    USER_TYPES = [CITIZEN, CLERK].freeze

    validates_uniqueness_of :username, :email
    validates :user_type, inclusion: { in: USER_TYPES }

    ## Database authenticatable
    field :email,              type: String
    field :username,           type: String
    field :encrypted_password, type: String
    field :first_name,         type: String
    field :last_name,          type: String
    field :user_type,          type: String, default: CITIZEN
    field :jti,                type: String

    ## Recoverable
    field :reset_password_token,   type: String
    field :reset_password_sent_at, type: Time

    ## Rememberable
    field :remember_created_at, type: Time

    ## Trackable
    # field :sign_in_count,      type: Integer, default: 0
    # field :current_sign_in_at, type: Time
    # field :last_sign_in_at,    type: Time
    # field :current_sign_in_ip, type: String
    # field :last_sign_in_ip,    type: String

    ## Confirmable
    # field :confirmation_token,   type: String
    # field :confirmed_at,         type: Time
    # field :confirmation_sent_at, type: Time
    # field :unconfirmed_email,    type: String # Only if using reconfirmable

    ## Lockable
    # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
    # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
    # field :locked_at,       type: Time

    def is_citizen?
        return user_type == CITIZEN
    end

    def is_clerk?
        return user_type == CLERK
    end
end
