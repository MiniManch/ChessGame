from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, PasswordField, EmailField, FileField)
from wtforms.validators import InputRequired, Email, Length, EqualTo
import email_validator


class ResetPasswordRequestForm(FlaskForm):
    email = StringField('Email', validators=[InputRequired(), Email()])
    submit = SubmitField('Request Password Reset')


class ResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[InputRequired()])
    confirm  = PasswordField('Confirm Password', validators=[InputRequired(), EqualTo('password')])
    submit = SubmitField('Change Password!')