# frozen_string_literal: true

class HomeController < ApplicationController
    def index
        render :xml => {:message => "Hello!"}.to_xml(root: :message)
    end
end
