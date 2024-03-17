import graphene
from .models import Person, Bill
from graphene_django import DjangoObjectType

class PersonType(DjangoObjectType):
  class Meta:
    model = Person
    fields = ("id", "name", "amount", "paid")

class BillType(DjangoObjectType):
  class Meta:
    model = Bill
    fields = ("id", "name", "amount", "organizer", "participants")

class CreateBill(graphene.Mutation):
  class Arguments:
    name = graphene.String(required=True)
    amount = graphene.String(required=True)
    organizer = graphene.ID(required=True)
    participants = graphene.List(graphene.ID, required=True)

  bill = graphene.Field(BillType)

  def mutate(self, info, name, amount, organizer, participants):
    organizer_instance = Person.objects.get(pk=organizer)  # Retrieve the Person instance with the given ID
    bill = Bill(name=name, amount=amount, organizer=organizer_instance)
    bill.save()
    bill.participants.set(participants)  # Set the many-to-many relationship
    return CreateBill(bill=bill)

class CreatePerson(graphene.Mutation):
  class Arguments:
    name = graphene.String(required=True)
    amount = graphene.String(required=True)

  person = graphene.Field(PersonType)

  def mutate(self, info, name, amount):  # Added 'name' and 'amount' arguments
    person = Person(name=name, amount=amount, paid=False)
    person.save()
    return CreatePerson(person=person)

class UpdatePerson(graphene.Mutation):
  class Arguments:
    id = graphene.ID(required=True)

  completed = graphene.Boolean()

  def mutate(self, info, id):
    try:
      person = Person.objects.get(pk=id)
    except:
      raise Exception("Person does not exist")
    else:
      person.paid = True
      person.save()
      return UpdatePerson(completed=True)
    
class DeleteBill(graphene.Mutation):
  class Arguments:
    id = graphene.ID(required=True)

  ok = graphene.Boolean()

  def mutate(self, info, id):
    try:
      bill = Bill.objects.get(pk=id)
    except BillType.DoesNotExist:
      raise Exception("Bill does not exist")
    else:
      bill.delete()
      return DeleteBill(ok=True)
    
class DeletePerson(graphene.Mutation):
  class Arguments:
    id = graphene.ID(required=True)

  ok = graphene.Boolean()

  def mutate(self, info, id):
    try:
      person = Person.objects.get(pk=id) 
    except PersonType.DoesNotExist:
      raise Exception("Person does not exist")
    else:
      person.delete()
      return DeletePerson(ok=True)

class Query(graphene.ObjectType):
  bill = graphene.List(BillType, id=graphene.ID())
  # person = graphene.Field(PersonType, id=graphene.ID())
  person = graphene.List(PersonType, id=graphene.ID())

  def resolve_bill(self, info, id):
    return Bill.objects.filter(id=id)
  
  def resolve_person(self, info, id):
    return Person.objects.filter(id=id)
  
class Mutation(graphene.ObjectType):
  create_person = CreatePerson.Field()
  create_bill = CreateBill.Field()
  update_person = UpdatePerson.Field()
  delete_bill = DeleteBill.Field()
  delete_person = DeletePerson.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)