# Generated by Django 2.2.6 on 2019-10-14 08:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='propertAddress',
            new_name='propertyAddress',
        ),
    ]