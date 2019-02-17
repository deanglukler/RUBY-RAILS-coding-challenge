# frozen_string_literal: true

class CreateShifts < ActiveRecord::Migration[5.2]
  def change
    create_table :shifts do |t|
      t.belongs_to :user
      t.integer :employee_id
      t.integer :start
      t.integer :end
      t.boolean :confirmed
      t.text :notes
      t.timestamps
    end
  end
end
