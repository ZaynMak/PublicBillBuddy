# Generated by Django 4.2.10 on 2024-03-02 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bill_buddy_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='amount',
            field=models.CharField(default=0, max_length=10),
        ),
        migrations.AlterField(
            model_name='person',
            name='amount',
            field=models.CharField(default=0, max_length=10),
        ),
    ]