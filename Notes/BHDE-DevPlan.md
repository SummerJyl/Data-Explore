# BHDE Nutrition Tracker - Development Plan

## Project Overview

Building a nutrition tracking application that allows users to search USDA food database, set nutrition goals, and track their daily consumption.

## Current Status

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
