# Generated by Django 3.0.7 on 2020-07-06 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0010_auto_20200706_0437'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='party',
            field=models.CharField(blank=True, choices=[('Republican', 'Republican'), ('Democrat', 'Democrat')], default='', max_length=20, null=True),
        ),
    ]
