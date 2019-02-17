# frozen_string_literal: true

require 'test_helper'
require 'date'

module Api
  class ShiftsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @header = {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NTA1MDk5NDB9.jXAFsj7ri1i_63HyraSODxcKQpqDgYlRU--xBm0iIoc',
        'Content-Type': 'application/json'
      }
    end

    test 'creates a shift' do
      nowSecs = DateTime.now.strftime('%s').to_i # "1384526946" (seconds)
      shiftStart = nowSecs + 604800 # one week ahead
      shiftEnd = shiftStart + 1800 # half hour ahead
      shift_data = { 'start': shiftStart.to_s, 'end': shiftEnd.to_s }

      post api_shifts_path, headers: @header
      assert_response :success
    end
  end
end
