from flask import Blueprint, render_template
from flask_login import login_required, current_user
from .models import Appointment

admin = Blueprint('admin', __name__)

@admin.route('/dashboard')
@login_required
def dashboard():
    if current_user.username != 'admin':
        return redirect(url_for('main.index'))
    appointments = Appointment.query.order_by(Appointment.date).all()
    return render_template('dashboard.html', appointments=appointments)
