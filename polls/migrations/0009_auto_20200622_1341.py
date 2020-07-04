# Generated by Django 3.0.7 on 2020-06-22 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0008_auto_20200622_0557'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='response',
            options={'ordering': ['response_id', 'candidate']},
        ),
        migrations.AddField(
            model_name='election',
            name='description',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='registertovote',
            name='state_abbr',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]