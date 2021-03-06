# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-18 20:20
from __future__ import unicode_literals

from django.db import migrations, models
import openslides.utils.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('mediafiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('text', models.TextField(blank=True)),
                ('attachments', models.ManyToManyField(blank=True, to='mediafiles.Mediafile')),
            ],
            options={
                'default_permissions': (),
            },
            bases=(openslides.utils.models.RESTModelMixin, models.Model),
        ),
    ]
