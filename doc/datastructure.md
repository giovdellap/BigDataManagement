## MODELS
- ChartGenerator
  - Parameters:
    - presence_penalty
    - temperature
  - Request
- ChartAnalyzer:
  - Parameters:
    - frequency_penalty
    - temperature
  - SpecialRequest
- GraphPredictor
  - Parameters:
    - frequency_penalty
    - presence_penalty
  - Request
- MarketTrackerParameters
  - Parameters: 
    - top_p
  - Request

## BOUNDARIES

### PARAMETERS
- presence_penalty: 0-2
- temperature: 0.2-0.6
- frequency_penalty: 0-2
- top_p: 0-1

### RELEVATIONS
- generations:
  - LOW: 1
  - MEDIUM: 2-3
  - HIGH: 4-6
- satisfaction:
  - LOW: 1-2
  - MEDIUM: 3
  - HIGH: 4-5
- wli:
  - LOW: 1-2
  - MEDIUM: 3-4
  - HIGH: 5
- tokens:
  - LOW: 3000-5000
  - MEDIUM: 5000-8000
  - HIGH: 8000-10000

### REQUESTS
- input_tokens:
  - LOW: 1000-2000
  - MEDIUM: 3000-6000
  - HIGH: 7000-1000
- total_tokens:
  - LOW: 10000-30000
  - MEDIUM: 30000-60000
  - HIGH: 60000-80000
- stream_messages:
  - LOW: 1-2
  - MEDIUM: 3
  - HIGH: 4-8
- loading_time:
  - LOW: 40-60
  - MEDIUM: 60-100
  - HIGH: 100-200
- input_dimension:
  - LOW: 1000-2000
  - MEDIUM: 2000-5000
  - HIGH: 5000-8000

## LOGS PER HOUR (RATE)
- LOW: 20-50
- MEDIUM: 50-80
- HIGH: 80-130

### LOW LOGS
- MONDAY: 20-24
- TUESDAY: 12-24
- WEDNESDAY: 12-24
- THURSDAY: 12-24
- FRIDAY: 0-12
- SATURDAY: 04-12
- SUNDAY: 04-12

### HIGH LOGS
- MONDAY: 0-4
- FRIDAY: 16-20
- SATURDAY: 00-04 / 16-20
- SUNDAY: 14-22
