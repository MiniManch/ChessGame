from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, FileField, SelectField, IntegerField, BooleanField)
from wtforms.validators import InputRequired, Length


class New_Guide(FlaskForm):
	subject            = StringField('Subject', validators=[InputRequired(),Length(min=10)], render_kw={"placeholder": 'for instance, How to change a Light Bulb'})
	description         = StringField('Description', validators=[InputRequired()])
	image               = FileField('Image')
	category = SelectField('Category')
	submit           = SubmitField('Submit')
