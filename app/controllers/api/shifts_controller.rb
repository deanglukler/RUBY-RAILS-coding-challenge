# frozen_string_literal: true

module Api
  class ShiftsController < ApplicationController
    def index
      if is_admin?
        shifts = Shift.where(user_id: @current_user.id)
        render json: { apiOk: true, msg: 'Shifts Delivery!', data: shifts },
               status: :ok
      else
        shifts = Shift.where(employee_id: @current_user.id)
        render json: { apiOk: true, msg: 'Shifts Delivery!', data: shifts },
               status: :ok
      end
    end

    def create
      if is_admin?
        shift = @current_user.shifts.new(shift_params)
        shift.confirmed = false
        if shift.save
          render json: { apiOk: true, msg: 'Shift Saved', data: shift },
                 status: :ok
        else
          render json: { apiOk: false, msg: 'Error Saving Shift', data: shift.errors },
                 status: :unprocessable_entity
        end
      else
        return_unauth
      end
    end

    def update
      @shift = Shift.find(params[:id])
      if is_admin_who_created?
        if shift.update_attributes(shift_params)
          render json: { apiOk: true, msg: 'Shift Updated', data: shift },
                 status: :ok
        else
          render json: { apiOk: false, msg: 'Error Updating Shift', data: shift.errors },
                 status: :unprocessable_entity
        end
      else
        return_unauth
      end
    end

    def employee_update
      shift = Shift.find(params[:id])
      puts "HHEERRREEE"
      puts shift.employee_id
      puts @current_user.id
      if shift.employee_id == @current_user.id
        if shift.update_attributes(employee_shift_params)
          render json: { apiOk: true, msg: 'Shift Updated', data: shift },
                 status: :ok
        else
          render json: { apiOk: false, msg: 'Error Updating Shift', data: shift.errors },
                 status: :unprocessable_entity
        end
      else
        return_unauth
      end
    end

    def delete
      shift = Shift.find(params[:id])
      shift.destroy
      render json: { apiOk: true, msg: 'Shift Deleted' },
             status: :ok
    end

    private

    def shift_params
      params.permit(:employee_id, :start, :end)
    end

    def employee_shift_params
      params.permit(:confirmed, :notes)
    end

    def is_admin?
      @current_user.role == 1
    end

    def is_admin_who_created?
      is_admin? && @shift.user_id == @current_user.id
    end

    def return_unauth
      render json: { apiOk: false, msg: 'You have no power' },
             status: :forbidden
    end
  end
end
