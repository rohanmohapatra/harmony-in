# Generated by Django 2.2.6 on 2019-10-14 15:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0004_auto_20191014_1456'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='moreData',
            new_name='moreDataString',
        ),
    ]
