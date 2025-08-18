# Spring Boot Nutrition API Setup Documentation

## Project Overview
**Project**: BioHealth Data Explorer - Nutrition API Backend  
**Location**: `/Users/jyliansummers/Desktop/WebDev Resume/PortfolioSite/BHDE/BioHealth/DataExplorer/backend`  
**Framework**: Spring Boot 3.5.4 with Java 21  
**Database**: H2 (in-memory) for development, PostgreSQL for production  

## Setup Process & Issues Encountered

### 1. Initial Gradle Wrapper Issue
**Problem**: Missing `gradle-wrapper.jar` file causing build failures
```bash
Error: Unable to access jarfile /path/to/gradle/wrapper/gradle-wrapper.jar
```

**Root Cause**: The `gradle/wrapper/` directory was in the parent directory (`DataExplorer/`) but `gradlew` script was in `backend/` subdirectory.

**Solution**: Copied gradle wrapper from parent to backend directory
```bash
cd backend
cp -r ../gradle ./
./gradlew --version  # Success - Downloaded Gradle 8.14.3
```

### 2. Database Connection Issues
**Problem**: PostgreSQL connection failures causing 500 Internal Server Errors
```bash
# Original config in application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nutrition_db
```

**Root Cause**: PostgreSQL wasn't running, or database didn't exist, causing SQL execution errors.

**Solution**: Switched to H2 in-memory database for development
```properties
# H2 Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### 3. Missing H2 Dependency
**Problem**: H2 driver not found in classpath
```bash
Cannot load driver class: org.h2.Driver
```

**Solution**: Added H2 dependency to `build.gradle`
```gradle
dependencies {
    // ... existing dependencies
    runtimeOnly 'com.h2database:h2'  // Added this line
}
```

## Final Working Configuration

### Application Structure
```
backend/
├── build.gradle                 # Updated with H2 dependency
├── gradlew                     # Gradle wrapper script
├── gradle/wrapper/             # Copied from parent directory
├── src/main/
│   ├── java/com/dataexplorer/nutritionapi/
│   │   ├── controller/
│   │   │   ├── FoodController.java
│   │   │   └── NutrientController.java
│   │   └── NutritionApiApplication.java
│   └── resources/
│       └── application.properties  # Configured for H2
```

### Working API Endpoints
- **GET** `/api/foods` - Get all foods
- **GET** `/api/foods/search?query={term}` - Search foods
- **GET** `/api/foods/{id}` - Get specific food
- **GET** `/api/foods?category={category}` - Get foods by category
- **POST** `/api/foods` - Create new food
- **GET** `/api/nutrients` - Get all nutrients  
- **GET** `/api/nutrients/{id}` - Get specific nutrient
- **GET** `/api/nutrients/category/{category}` - Get nutrients by category

### Development Tools
- **Server**: `http://localhost:8080`
- **H2 Console**: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (empty)

## Commands Used

### Start the server:
```bash
cd backend
./gradlew bootRun
```

### Test endpoints:
```bash
curl http://localhost:8080/api/foods
curl http://localhost:8080/api/nutrients
curl "http://localhost:8080/api/foods/search?query=apple"
```

## Files Backed Up
- `application.properties.backup` - Original PostgreSQL configuration
- `build.gradle.backup` - Original build file without H2

## Production Considerations

### To switch back to PostgreSQL:
1. Restore original config:
   ```bash
   cp src/main/resources/application.properties.backup src/main/resources/application.properties
   ```
2. Ensure PostgreSQL is running:
   ```bash
   brew services start postgresql
   createdb nutrition_db
   ```
3. Restart the application

### Environment-specific configs:
Consider using Spring profiles for different environments:
- `application-dev.properties` (H2 for development)
- `application-prod.properties` (PostgreSQL for production)

## Key Learnings
1. **Directory structure matters**: Gradle wrapper must be in same directory as `gradlew` script
2. **Database dependencies**: Runtime dependencies must be explicitly declared
3. **H2 for development**: Much easier to set up than PostgreSQL for quick testing
4. **Configuration backup**: Always backup working configs before changes
5. **In-memory databases**: Perfect for development, data doesn't persist between restarts

## Status
✅ **Spring Boot application running successfully**  
✅ **REST API endpoints functional**  
✅ **H2 database connected**  
✅ **Ready for frontend integration**  

**Next Steps**: Connect React frontend to consume these API endpoints at `http://localhost:8080/api/*`