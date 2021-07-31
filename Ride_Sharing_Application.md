# Ride Sharing Application
**Description:** Implement a ride-sharing application with the below-expected features.

## #**Features:**
- The application allows users to share rides on a route.
- Users can either offer a shared ride (Driver) or consume a shared ride (Passenger).
- Users can search and select one from multiple available rides on a route with the same source and destination.
## #**Requirements:**
- **Onboarding** - Application should allow user onboarding.
    - add_user(user_detail) - Add basic user details
    - add_vehicle(vehicle_detail) - Add the user’s vehicle(s) details
- **Rider Offering** - User should be able to offer a shared ride on a route with details.
    - offer_ride(ride_detail)
        - The ride will have details like vehicle, origin, destination, available seats.
        - (A ride will have no intermediate stops.)
        - Users can select a ride from multiple offered rides using a selection strategy.
        - (A user can only request a ride (only for 1 or 2 people))
- **Ride Selection**
    - select_ride(source, destination, seats, selection_strategy)
    - Selection Strategy
        - Preferred Vehicle (Activa/Polo/XUV)
        - Most Vacant.
    - Users can only offer a ride for a given vehicle, once there are no active offered rides for that vehicle.
- **Ride Closing**
    - end_ride(ride_details)
    - The system should be able to end the ride.
- **Reporting** - Find total rides offered/taken by all users.
    - print_ride_stats()
## #**Bonus Questions**:
1. **Route Mapping**
    1. If the user’s origin/destinations are not available directly but it’s possible via multiple rides, then the application should output multiple rides.
    2. (Example: for input: Bangalore to Mumbai, the output can be Bangalore to Goa and Goa to Mumbai)
2. **Bulk Onboarding**
    1. need to onboard users and vehicles, using the below excel format
    2. No Need to implement cloud storage/ upload APIs, use only local files
    
    [https://docs.google.com/spreadsheets/d/1hFntCDKfjX_CQyhXSqKbm7uH5Qjgjzxepam_KJt5mmQ/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1hFntCDKfjX_CQyhXSqKbm7uH5Qjgjzxepam_KJt5mmQ/edit?usp=sharing)
[](https://docs.google.com/spreadsheets/d/1hFntCDKfjX_CQyhXSqKbm7uH5Qjgjzxepam_KJt5mmQ/edit?usp=sharing)## #**Other Notes**:
- Write a driver class for demo purposes. Which will execute all the commands in one place in the code and test cases.
- Preferable database is MY-SQL or Postgre  or Mongo Db or you can do in memory 
- Do not create any UI for the application.
- Please prioritize code compilation, execution, and completion.
- Work on the expected output first and then add good-to-have features of your own.
## #**Expectations:**
- Make sure that you have a working and demonstrable code.
- Make sure that the code is functionally correct.
- Use of proper abstraction, modeling, separation of concerns is required.
- Code should be modular, readable, and unit-testable.
- Code should easily accommodate new requirements with minimal changes.
- Proper exception handling is required.
- Adding Unit test case is plus
## #**Sample Test Cases:**
- **Onboard 5 users**
    - add_user(“Rohan, M, 36”); add_vehicle(“Rohan, Swift, KA-01-12345)
    - add_user(“Shashank, M, 29”); add_vehicle(“Shashank, Baleno, TS-05-62395)
    - add_user(“Nandini, F, 29)add_user(“Shipra, F, 27”) ;
    - add_vehicle(“Shipra”, Polo, KA-05-41491);
    - add_vehicle(“Shipra, Activa KA-12-12332”)
    - add_user(“Gaurav, M, 29)
    - add_user(“Rahul, M, 35);
    - add_vehicle(“Rahul”, “XUV”, KA-05-1234);
- **Offer rides**
    a )offer_ride(“Rohan, Origin=Hyderabad, Available Seats=1, Vehicle=Swift, KA-01-12345, Destination= Bangalore”)
    b) offer_ride(“Shipra, Origin=Bangalore, Available Seats=1, Vehicle=Activa KA-12-12332, Destination=Mysore”)
    c) offer_ride(“Shipra, Origin=Bangalore, Available Seats=2, Vehicle=Polo, KA-05-41491, Destination=Mysore”)
    d) offer_ride(“Shashank, Origin=Hyderabad, Available Seats=2, Vehicle=Baleno, TS-05-62395, Destination=Bangalore”)
    e) offer_ride(“Rahul, Origin=Hyderabad, Available Seats=5, Vehicle=XUV, KA-05-1234, Destination=Bangalore”)
    f) offer_ride(“Rohan, Origin=Bangalore, Available Seats=1, Vehicle=Swift, KA-01-12345, Destination=Pune”)
        - This call should fail, since a ride has already been offered by this user for this vehicle.

**Find rides for 4 users**

- select_ride(“Nandini, Origin=Bangalore, Destination=Mysore, Seats=1, Most Vacant”) = c is the desired output.
- select_ride(“Gaurav, Origin=Bangalore, Destination=Mysore, Seats=1, Preferred Vehicle=Activa”) = b is the desired output
- select_ride(“Shashank, Origin=Mumbai, Destination=Bangalore, Seats=1, Most Vacant”) = No rides found
- select_ride(“Rohan, Origin=Hyderabad, Destination=Bangalore, Seats=1, Preferred Vehicle=Baleno”)  = d is the desired output
- select_ride(“Shashank, Origin=Hyderabad, Destination=Bangalore, Seats=1,Preferred Vehicle=Polo”) = No rides found

**End Rides:**

- end_ride(a)
- end_ride(b)
- end_ride(c)
- end_ride(d)

**Find total rides by user**:

- Rides Taken: Rides that have were taken and have been marked as “ended”
- Rides Offered: Rides that were offered and have been marked as “ended”.
- Note: Even if the offered ride was not taken by any user, it counts as an offered ride.

**print_ride_stats()**

- Nandini: 1 Taken, 0 Offered
- Rohan: 1 Taken, 1 Offered
- Shashank: 0 Taken, 1 Offered
- Gaurav: 1 Taken, 0 Offered
- Rahul: 0 Taken, 0 Offered
- Shipra: 0 Taken, 2 Offered
## 

