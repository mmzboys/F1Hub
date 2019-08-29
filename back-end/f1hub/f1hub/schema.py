import graphene

import drivers.schema
import results.schema
import constructors.schema
import races.schema
import status.schema
import circuits.schema
import constructorresults.schema
import constructorstandings.schema
import driverstandings.schema
import laptimes.schema
import pitstops.schema
import qualifying.schema
import seasons.schema


class Query(drivers.schema.Query, results.schema.Query, constructors.schema.Query, races.schema.Query, status.schema.Query, circuits.schema.Query,\
    constructorresults.schema.Query, constructorstandings.schema.Query, driverstandings.schema.Query, laptimes.schema.Query, pitstops.schema.Query,\
    qualifying.schema.Query, seasons.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
