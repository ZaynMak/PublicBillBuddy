from django.db import models
import math

class Person(models.Model):
    name = models.CharField(max_length=100)
    amount = models.CharField(max_length=10, default=0)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Bill(models.Model):
    name = models.CharField(max_length=100)
    amount = models.CharField(max_length=10, default=0)
    organizer = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='organizer')
    participants = models.ManyToManyField(Person, related_name='participants')

    def __str__(self):
        return self.name
    
    def even_split(self):
        # return the amount of money each person should pay in a list
        # floor it to the second decimal place
        # if there is a remainder, add it to each person until it runs out
        split = self.amount / (self.participants.count() + 1)
        split_list = [math.floor(split * 100) / 100 for i in range(self.participants.count())]
        remainder = (self.amount * 100) % (self.participants.count() + 1)
        for i in range(remainder):
            split_list[i] += 0.01
        return split_list

    def get_participants(self):
        return self.participants.all()
    
    def check_paid(self):
        for person in self.participants.all():
            if not person.paid:
                return False
        return True
    
    def set_paid(self):
        self.all_paid = True
        self.save()

    