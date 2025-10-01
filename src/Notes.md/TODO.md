# BHDE Nutrition Tracker - Unified Development Plan

## Project Vision

A nutrition tracking application that allows users to explore USDA food database, set personal nutrition goals, log daily food intake, and visualize progress toward their health objectives.

## Current Status

- ✅ Spring Boot backend setup
- ✅ Basic project structure (controller/model/repository/service)
- ✅ USDA food database integration
- ✅ User authentication (User entity, login/register endpoints and UI)
- ✅ React frontend with routing
- ⏳ User profile display (needs work)

## Phase 1: User Profile & Goals [CURRENT FOCUS]

### Week 1: Display Logged-In User

- [ ] Update Home.tsx to show user info when authenticated
- [ ] Add logout button
- [ ] Add navigation to login/register when not logged in
- [ ] Style user profile section

### Week 2: NutritionGoal Backend

- [ ] Create NutritionGoal entity (daily targets for calories, protein, carbs, fat)
- [ ] Build NutritionGoalRepository
- [ ] Implement NutritionGoalService (CRUD operations)
- [ ] Create NutritionGoalController endpoints
- [ ] Test with Postman

### Week 3: NutritionGoal Frontend

- [ ] Create Goals page component
- [ ] Build form to set/edit nutrition goals
- [ ] Display current goals on dashboard
- [ ] Add goal validation and error handling

## Phase 2: Enhanced Food Search & Exploration

### Week 4: Advanced Search Features

- [ ] Add filter UI (checkboxes/dropdowns) for nutrient categories
  - [ ] Protein, Fat, Carbs
  - [ ] Vitamins, Minerals
- [ ] Implement filter logic in backend
- [ ] Show active filters as removable chips
- [ ] Add "clear all filters" functionality

### Week 5: Search UX Improvements

- [ ] Add loading states for searches
- [ ] Handle empty results gracefully
- [ ] Implement pagination for search results
- [ ] Add food detail view (modal or separate page)

## Phase 3: Food Logging & Tracking

### Week 6: FoodLog Backend

- [ ] Create FoodLog entity (tracks what user ate)
- [ ] FoodLog repository and service
- [ ] Link FoodLog to User and FoodItem
- [ ] Create logging endpoints (add/delete/view logs)

### Week 7: FoodLog Frontend

- [ ] Add "Log This Food" button to search results
- [ ] Create food diary page showing logged foods
- [ ] Display daily totals (calories, macros)
- [ ] Add abil# BHDE Nutrition Tracker - Development Plan

## Project Overview

Building a nutrition tracking application that allows users to search USDA food database, set nutrition goals, and track their daily consumption.

## Current Status - 09/30/2025

- ✅ Spring Boot setup complete
- ✅ Basic project structure (controller/model/repository/service)
- ✅ USDA food database integration
- ⏳ User authentication (pending verification)

## Build Roadmap

### Week 1: User Entity + Authentication

- [ ] User model with basic fields
- [ ] User repository
- [ ] Authentication service
- [ ] Login/registration endpoints

### Week 2: NutritionGoal Entity + Endpoints

- [ ] Design NutritionGoal model
- [ ] Create entity class with annotations
- [ ] Build repository interface
- [ ] Implement service layer (CRUD)
- [ ] Create controller endpoints
- [ ] Test with sample data

### Week 3: FoodItem Entity (USDA Data)

- [ ] FoodItem model matching USDA structure
- [ ] Repository and service layer
- [ ] Search/filter endpoints
- [ ] Integration with USDA API

### Week 4: FoodLog Entity (Consumption Tracking)

- [ ] FoodLog model (user logs meals)
- [ ] Repository and service layer
- [ ] Logging endpoints
- [ ] Link to FoodItem and User

### Week 5: Progress Calculation Logic

- [ ] Calculate daily totals from FoodLog
- [ ] Compare against NutritionGoal
- [ ] Progress percentage calculations
- [ ] Dashboard/summary endpoints

## Daily Practice Strategy

- **Time commitment:** 30-60 minutes per day
- **Goal:** One small commit per day minimum
- **Focus:** Keep momentum, stay interview-ready
- **Track:** Check off tasks as completed

## Current Focus: NutritionGoal Entity

### NutritionGoal Model Design

```java
@Entity
@Table(name = "nutrition_goals")
public class NutritionGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long userId;  // FK to User
    
    @Enumerated(EnumType.STRING)
    private GoalType goalType;  // DAILY, WEEKLY
    
    private Integer targetCalories;
    private Integer targetProtein;   // grams
    private Integer targetCarbs;     // grams
    private Integer targetFat;       // grams
    
    private LocalDate startDate;
    private LocalDate endDate;       // null = ongoing
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

### Implementation Checklist

- [ ] Create NutritionGoal entity class
- [ ] Create GoalType enum (DAILY, WEEKLY)
- [ ] Create NutritionGoalRepository interface
- [ ] Implement NutritionGoalService
  - [ ] createGoal()
  - [ ] getGoalByUserId()
  - [ ] updateGoal()
  - [ ] deleteGoal()
  - [ ] getActiveGoal()
- [ ] Create NutritionGoalController
  - [ ] POST /api/goals (create)
  - [ ] GET /api/goals/{userId} (retrieve)
  - [ ] PUT /api/goals/{id} (update)
  - [ ] DELETE /api/goals/{id} (delete)
- [ ] Write tests
- [ ] Test with Postman/curl

## User Flow

1. User logs in / creates account
2. User sets nutrition goals (daily targets)
3. User searches USDA food database
4. User filters by: Protein | Fat | Carbs | Vitamins | Minerals
5. User logs foods consumed
6. App shows progress toward goals

## Interview Talking Points

- RESTful API design decisions
- Data modeling for nutrition tracking
- Database relationships and foreign keys
- Service layer architecture
- USDA API integration patterns
- Progress calculation algorithms

## Notes

- Keep commits small and focused
- Write clear commit messages
- Document design decisions
- Focus on one feature at a time
- Build iteratively, test frequently
