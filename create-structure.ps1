
# ============================================================
# English Mastery Platform - Complete Project Structure Creator
# Next.js App Router + Vercel Deployment
# ============================================================

$base = "c:\Users\MR.ROBOT\OneDrive - Park University\Desktop\English"

function Touch-File {
    param([string]$Path)
    $fullPath = Join-Path $base $Path
    $dir = Split-Path $fullPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType File -Path $fullPath -Force | Out-Null
    }
}

Write-Host "Creating English Mastery Platform Structure..." -ForegroundColor Cyan

# ============================================================
# ROOT CONFIG FILES
# ============================================================
Write-Host "  [1/20] Root config files..." -ForegroundColor Yellow

$rootFiles = @(
    "package.json",
    "next.config.mjs",
    "tailwind.config.js",
    "postcss.config.mjs",
    "jsconfig.json",
    ".env.local",
    ".env.example",
    ".gitignore",
    "vercel.json",
    "README.md",
    ".eslintrc.json",
    ".prettierrc",
    ".prettierignore",
    "middleware.js"
)
foreach ($f in $rootFiles) { Touch-File $f }

# ============================================================
# APP DIRECTORY - NEXT.JS APP ROUTER
# ============================================================
Write-Host "  [2/20] App directory (Next.js App Router)..." -ForegroundColor Yellow

# Root app files
$appRoot = @(
    "app/layout.js",
    "app/page.js",
    "app/globals.css",
    "app/loading.js",
    "app/error.js",
    "app/not-found.js",
    "app/manifest.json",
    "app/sitemap.js",
    "app/robots.js",
    "app/opengraph-image.js"
)
foreach ($f in $appRoot) { Touch-File $f }

# Auth Pages
$authPages = @(
    "app/(auth)/layout.js",
    "app/(auth)/login/page.js",
    "app/(auth)/login/loading.js",
    "app/(auth)/register/page.js",
    "app/(auth)/register/loading.js",
    "app/(auth)/forgot-password/page.js",
    "app/(auth)/forgot-password/loading.js",
    "app/(auth)/reset-password/page.js",
    "app/(auth)/verify-email/page.js"
)
foreach ($f in $authPages) { Touch-File $f }

# Main App Pages
$mainPages = @(
    # Dashboard
    "app/(main)/layout.js",
    "app/(main)/dashboard/page.js",
    "app/(main)/dashboard/loading.js",
    "app/(main)/dashboard/error.js",
    
    # Topics listing
    "app/(main)/topics/page.js",
    "app/(main)/topics/loading.js",
    
    # Dynamic topic pages
    "app/(main)/topics/[topicSlug]/page.js",
    "app/(main)/topics/[topicSlug]/loading.js",
    "app/(main)/topics/[topicSlug]/layout.js",
    "app/(main)/topics/[topicSlug]/concept/page.js",
    "app/(main)/topics/[topicSlug]/concept/loading.js",
    "app/(main)/topics/[topicSlug]/vocabulary/page.js",
    "app/(main)/topics/[topicSlug]/vocabulary/loading.js",
    "app/(main)/topics/[topicSlug]/practice/page.js",
    "app/(main)/topics/[topicSlug]/practice/loading.js",
    "app/(main)/topics/[topicSlug]/test/page.js",
    "app/(main)/topics/[topicSlug]/test/loading.js",
    "app/(main)/topics/[topicSlug]/test/result/page.js",
    "app/(main)/topics/[topicSlug]/essay/page.js",
    "app/(main)/topics/[topicSlug]/essay/loading.js",
    "app/(main)/topics/[topicSlug]/common-errors/page.js",
    "app/(main)/topics/[topicSlug]/common-errors/loading.js",
    "app/(main)/topics/[topicSlug]/answers/page.js",
    "app/(main)/topics/[topicSlug]/answers/loading.js",
    "app/(main)/topics/[topicSlug]/review/page.js",
    
    # Dynamic subtopic pages
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/loading.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/concept/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/vocabulary/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/practice/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/test/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/test/result/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/essay/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/common-errors/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/answers/page.js",
    "app/(main)/topics/[topicSlug]/[subtopicSlug]/review/page.js",
    
    # Progress & Scores
    "app/(main)/progress/page.js",
    "app/(main)/progress/loading.js",
    "app/(main)/progress/[topicSlug]/page.js",
    "app/(main)/scores/page.js",
    "app/(main)/scores/loading.js",
    "app/(main)/scores/[topicSlug]/page.js",
    "app/(main)/scores/history/page.js",
    
    # Vocabulary Bank
    "app/(main)/vocabulary-bank/page.js",
    "app/(main)/vocabulary-bank/loading.js",
    "app/(main)/vocabulary-bank/daily-words/page.js",
    "app/(main)/vocabulary-bank/professional-words/page.js",
    "app/(main)/vocabulary-bank/office-words/page.js",
    "app/(main)/vocabulary-bank/verbs/page.js",
    "app/(main)/vocabulary-bank/phrases/page.js",
    "app/(main)/vocabulary-bank/idioms/page.js",
    "app/(main)/vocabulary-bank/collocations/page.js",
    "app/(main)/vocabulary-bank/search/page.js",
    "app/(main)/vocabulary-bank/flashcards/page.js",
    "app/(main)/vocabulary-bank/saved/page.js",
    
    # Daily Practice
    "app/(main)/daily-practice/page.js",
    "app/(main)/daily-practice/loading.js",
    "app/(main)/daily-practice/conversation/page.js",
    "app/(main)/daily-practice/sentence-building/page.js",
    "app/(main)/daily-practice/translation/page.js",
    "app/(main)/daily-practice/fill-blanks/page.js",
    "app/(main)/daily-practice/error-correction/page.js",
    "app/(main)/daily-practice/word-of-the-day/page.js",
    
    # Quick Test
    "app/(main)/quick-test/page.js",
    "app/(main)/quick-test/loading.js",
    "app/(main)/quick-test/[topicSlug]/page.js",
    "app/(main)/quick-test/mixed/page.js",
    "app/(main)/quick-test/result/page.js",
    
    # Achievements
    "app/(main)/achievements/page.js",
    "app/(main)/achievements/loading.js",
    "app/(main)/achievements/badges/page.js",
    "app/(main)/achievements/streaks/page.js",
    "app/(main)/achievements/milestones/page.js",
    
    # Leaderboard
    "app/(main)/leaderboard/page.js",
    "app/(main)/leaderboard/loading.js",
    
    # Profile & Settings
    "app/(main)/profile/page.js",
    "app/(main)/profile/loading.js",
    "app/(main)/profile/edit/page.js",
    "app/(main)/settings/page.js",
    "app/(main)/settings/loading.js",
    "app/(main)/settings/appearance/page.js",
    "app/(main)/settings/sound/page.js",
    "app/(main)/settings/notifications/page.js",
    "app/(main)/settings/language/page.js",
    
    # Grammar Reference
    "app/(main)/grammar-reference/page.js",
    "app/(main)/grammar-reference/loading.js",
    "app/(main)/grammar-reference/[topicSlug]/page.js",
    
    # Bookmarks
    "app/(main)/bookmarks/page.js",
    "app/(main)/bookmarks/loading.js",
    
    # Notes
    "app/(main)/notes/page.js",
    "app/(main)/notes/loading.js",
    "app/(main)/notes/[noteId]/page.js",
    
    # Help
    "app/(main)/help/page.js",
    "app/(main)/help/loading.js",
    "app/(main)/help/faq/page.js",
    "app/(main)/help/contact/page.js",
    "app/(main)/help/guide/page.js"
)
foreach ($f in $mainPages) { Touch-File $f }

# Landing/Marketing Pages
$landingPages = @(
    "app/(marketing)/layout.js",
    "app/(marketing)/about/page.js",
    "app/(marketing)/features/page.js",
    "app/(marketing)/pricing/page.js",
    "app/(marketing)/contact/page.js",
    "app/(marketing)/privacy/page.js",
    "app/(marketing)/terms/page.js",
    "app/(marketing)/testimonials/page.js",
    "app/(marketing)/blog/page.js",
    "app/(marketing)/blog/[slug]/page.js"
)
foreach ($f in $landingPages) { Touch-File $f }

# ============================================================
# API ROUTES
# ============================================================
Write-Host "  [3/20] API routes..." -ForegroundColor Yellow

$apiRoutes = @(
    # Auth API
    "app/api/auth/login/route.js",
    "app/api/auth/register/route.js",
    "app/api/auth/logout/route.js",
    "app/api/auth/refresh/route.js",
    "app/api/auth/verify/route.js",
    "app/api/auth/forgot-password/route.js",
    "app/api/auth/reset-password/route.js",
    
    # Topics API
    "app/api/topics/route.js",
    "app/api/topics/[topicSlug]/route.js",
    "app/api/topics/[topicSlug]/subtopics/route.js",
    "app/api/topics/[topicSlug]/concept/route.js",
    "app/api/topics/[topicSlug]/vocabulary/route.js",
    
    # Questions API
    "app/api/questions/route.js",
    "app/api/questions/practice/route.js",
    "app/api/questions/practice/[topicSlug]/route.js",
    "app/api/questions/test/route.js",
    "app/api/questions/test/[topicSlug]/route.js",
    "app/api/questions/daily/route.js",
    "app/api/questions/random/route.js",
    "app/api/questions/check-answer/route.js",
    
    # Scores API
    "app/api/scores/route.js",
    "app/api/scores/[topicSlug]/route.js",
    "app/api/scores/history/route.js",
    "app/api/scores/leaderboard/route.js",
    "app/api/scores/stats/route.js",
    "app/api/scores/update/route.js",
    
    # Progress API
    "app/api/progress/route.js",
    "app/api/progress/[topicSlug]/route.js",
    "app/api/progress/update/route.js",
    "app/api/progress/streak/route.js",
    "app/api/progress/weekly/route.js",
    "app/api/progress/monthly/route.js",
    
    # Vocabulary API
    "app/api/vocabulary/route.js",
    "app/api/vocabulary/[topicSlug]/route.js",
    "app/api/vocabulary/search/route.js",
    "app/api/vocabulary/word-of-the-day/route.js",
    "app/api/vocabulary/saved/route.js",
    "app/api/vocabulary/flashcards/route.js",
    
    # Essays API
    "app/api/essays/route.js",
    "app/api/essays/[topicSlug]/route.js",
    
    # User API
    "app/api/user/route.js",
    "app/api/user/profile/route.js",
    "app/api/user/settings/route.js",
    "app/api/user/achievements/route.js",
    "app/api/user/bookmarks/route.js",
    "app/api/user/notes/route.js",
    
    # Dashboard API
    "app/api/dashboard/route.js",
    "app/api/dashboard/stats/route.js",
    "app/api/dashboard/charts/route.js",
    "app/api/dashboard/recent-activity/route.js",
    
    # Analytics API
    "app/api/analytics/route.js",
    "app/api/analytics/track/route.js"
)
foreach ($f in $apiRoutes) { Touch-File $f }

# ============================================================
# COMPONENTS
# ============================================================
Write-Host "  [4/20] Components..." -ForegroundColor Yellow

# UI Components
$uiComponents = @(
    "components/ui/Button.jsx",
    "components/ui/Button.module.css",
    "components/ui/Card.jsx",
    "components/ui/Card.module.css",
    "components/ui/Input.jsx",
    "components/ui/Input.module.css",
    "components/ui/Modal.jsx",
    "components/ui/Modal.module.css",
    "components/ui/Badge.jsx",
    "components/ui/Badge.module.css",
    "components/ui/Tooltip.jsx",
    "components/ui/Tooltip.module.css",
    "components/ui/Avatar.jsx",
    "components/ui/Avatar.module.css",
    "components/ui/Dropdown.jsx",
    "components/ui/Dropdown.module.css",
    "components/ui/Tabs.jsx",
    "components/ui/Tabs.module.css",
    "components/ui/Accordion.jsx",
    "components/ui/Accordion.module.css",
    "components/ui/ProgressBar.jsx",
    "components/ui/ProgressBar.module.css",
    "components/ui/CircularProgress.jsx",
    "components/ui/CircularProgress.module.css",
    "components/ui/Skeleton.jsx",
    "components/ui/Skeleton.module.css",
    "components/ui/Toast.jsx",
    "components/ui/Toast.module.css",
    "components/ui/Alert.jsx",
    "components/ui/Alert.module.css",
    "components/ui/Select.jsx",
    "components/ui/Select.module.css",
    "components/ui/Checkbox.jsx",
    "components/ui/Checkbox.module.css",
    "components/ui/Radio.jsx",
    "components/ui/Radio.module.css",
    "components/ui/Switch.jsx",
    "components/ui/Switch.module.css",
    "components/ui/Slider.jsx",
    "components/ui/Slider.module.css",
    "components/ui/TextArea.jsx",
    "components/ui/TextArea.module.css",
    "components/ui/Spinner.jsx",
    "components/ui/Spinner.module.css",
    "components/ui/Divider.jsx",
    "components/ui/Divider.module.css",
    "components/ui/Chip.jsx",
    "components/ui/Chip.module.css",
    "components/ui/Popover.jsx",
    "components/ui/Popover.module.css",
    "components/ui/Dialog.jsx",
    "components/ui/Dialog.module.css",
    "components/ui/Sheet.jsx",
    "components/ui/Sheet.module.css",
    "components/ui/Command.jsx",
    "components/ui/Command.module.css",
    "components/ui/Calendar.jsx",
    "components/ui/Calendar.module.css",
    "components/ui/DatePicker.jsx",
    "components/ui/DatePicker.module.css",
    "components/ui/Pagination.jsx",
    "components/ui/Pagination.module.css",
    "components/ui/Breadcrumb.jsx",
    "components/ui/Breadcrumb.module.css",
    "components/ui/ScrollArea.jsx",
    "components/ui/ScrollArea.module.css",
    "components/ui/Separator.jsx",
    "components/ui/Separator.module.css",
    "components/ui/HoverCard.jsx",
    "components/ui/HoverCard.module.css",
    "components/ui/AspectRatio.jsx",
    "components/ui/Collapsible.jsx",
    "components/ui/Collapsible.module.css",
    "components/ui/NavigationMenu.jsx",
    "components/ui/NavigationMenu.module.css",
    "components/ui/ToggleGroup.jsx",
    "components/ui/ToggleGroup.module.css",
    "components/ui/index.js"
)
foreach ($f in $uiComponents) { Touch-File $f }

# Layout Components
$layoutComponents = @(
    "components/layout/Header.jsx",
    "components/layout/Header.module.css",
    "components/layout/Footer.jsx",
    "components/layout/Footer.module.css",
    "components/layout/Sidebar.jsx",
    "components/layout/Sidebar.module.css",
    "components/layout/Navigation.jsx",
    "components/layout/Navigation.module.css",
    "components/layout/MobileMenu.jsx",
    "components/layout/MobileMenu.module.css",
    "components/layout/TopBar.jsx",
    "components/layout/TopBar.module.css",
    "components/layout/BottomNav.jsx",
    "components/layout/BottomNav.module.css",
    "components/layout/PageWrapper.jsx",
    "components/layout/PageWrapper.module.css",
    "components/layout/Container.jsx",
    "components/layout/Container.module.css",
    "components/layout/Grid.jsx",
    "components/layout/Grid.module.css",
    "components/layout/Section.jsx",
    "components/layout/Section.module.css",
    "components/layout/index.js"
)
foreach ($f in $layoutComponents) { Touch-File $f }

# Dashboard Components
$dashboardComponents = @(
    "components/dashboard/StatsCard.jsx",
    "components/dashboard/StatsCard.module.css",
    "components/dashboard/ProgressChart.jsx",
    "components/dashboard/ProgressChart.module.css",
    "components/dashboard/ScoreGraph.jsx",
    "components/dashboard/ScoreGraph.module.css",
    "components/dashboard/TopicProgress.jsx",
    "components/dashboard/TopicProgress.module.css",
    "components/dashboard/RecentActivity.jsx",
    "components/dashboard/RecentActivity.module.css",
    "components/dashboard/StreakCounter.jsx",
    "components/dashboard/StreakCounter.module.css",
    "components/dashboard/LeaderBoard.jsx",
    "components/dashboard/LeaderBoard.module.css",
    "components/dashboard/WeeklyReport.jsx",
    "components/dashboard/WeeklyReport.module.css",
    "components/dashboard/DailyGoal.jsx",
    "components/dashboard/DailyGoal.module.css",
    "components/dashboard/QuickActions.jsx",
    "components/dashboard/QuickActions.module.css",
    "components/dashboard/TopicOverview.jsx",
    "components/dashboard/TopicOverview.module.css",
    "components/dashboard/AccuracyMeter.jsx",
    "components/dashboard/AccuracyMeter.module.css",
    "components/dashboard/TimeSpent.jsx",
    "components/dashboard/TimeSpent.module.css",
    "components/dashboard/UpcomingTopics.jsx",
    "components/dashboard/UpcomingTopics.module.css",
    "components/dashboard/MotivationalQuote.jsx",
    "components/dashboard/MotivationalQuote.module.css",
    "components/dashboard/PerformanceSummary.jsx",
    "components/dashboard/PerformanceSummary.module.css",
    "components/dashboard/WeaknessHighlight.jsx",
    "components/dashboard/WeaknessHighlight.module.css",
    "components/dashboard/StrengthHighlight.jsx",
    "components/dashboard/StrengthHighlight.module.css",
    "components/dashboard/index.js"
)
foreach ($f in $dashboardComponents) { Touch-File $f }

# Topics Components
$topicComponents = @(
    "components/topics/TopicCard.jsx",
    "components/topics/TopicCard.module.css",
    "components/topics/TopicList.jsx",
    "components/topics/TopicList.module.css",
    "components/topics/TopicGrid.jsx",
    "components/topics/TopicGrid.module.css",
    "components/topics/SubtopicCard.jsx",
    "components/topics/SubtopicCard.module.css",
    "components/topics/SubtopicList.jsx",
    "components/topics/SubtopicList.module.css",
    "components/topics/ConceptExplainer.jsx",
    "components/topics/ConceptExplainer.module.css",
    "components/topics/TopicHeader.jsx",
    "components/topics/TopicHeader.module.css",
    "components/topics/TopicNavigation.jsx",
    "components/topics/TopicNavigation.module.css",
    "components/topics/TopicSidebar.jsx",
    "components/topics/TopicSidebar.module.css",
    "components/topics/TopicBreadcrumb.jsx",
    "components/topics/TopicBreadcrumb.module.css",
    "components/topics/TopicProgressBar.jsx",
    "components/topics/TopicProgressBar.module.css",
    "components/topics/TopicStats.jsx",
    "components/topics/TopicStats.module.css",
    "components/topics/TopicFilter.jsx",
    "components/topics/TopicFilter.module.css",
    "components/topics/TopicSearch.jsx",
    "components/topics/TopicSearch.module.css",
    "components/topics/ConceptBlock.jsx",
    "components/topics/ConceptBlock.module.css",
    "components/topics/RuleCard.jsx",
    "components/topics/RuleCard.module.css",
    "components/topics/ExampleSentence.jsx",
    "components/topics/ExampleSentence.module.css",
    "components/topics/FormulaCard.jsx",
    "components/topics/FormulaCard.module.css",
    "components/topics/TipCard.jsx",
    "components/topics/TipCard.module.css",
    "components/topics/WarningCard.jsx",
    "components/topics/WarningCard.module.css",
    "components/topics/NoteCard.jsx",
    "components/topics/NoteCard.module.css",
    "components/topics/ComparisonTable.jsx",
    "components/topics/ComparisonTable.module.css",
    "components/topics/index.js"
)
foreach ($f in $topicComponents) { Touch-File $f }

# Practice Components
$practiceComponents = @(
    "components/practice/QuestionCard.jsx",
    "components/practice/QuestionCard.module.css",
    "components/practice/AnswerInput.jsx",
    "components/practice/AnswerInput.module.css",
    "components/practice/MultipleChoice.jsx",
    "components/practice/MultipleChoice.module.css",
    "components/practice/FillInBlank.jsx",
    "components/practice/FillInBlank.module.css",
    "components/practice/TrueFalse.jsx",
    "components/practice/TrueFalse.module.css",
    "components/practice/MatchPairs.jsx",
    "components/practice/MatchPairs.module.css",
    "components/practice/Reorder.jsx",
    "components/practice/Reorder.module.css",
    "components/practice/TranslateQuestion.jsx",
    "components/practice/TranslateQuestion.module.css",
    "components/practice/ErrorCorrection.jsx",
    "components/practice/ErrorCorrection.module.css",
    "components/practice/SentenceBuilder.jsx",
    "components/practice/SentenceBuilder.module.css",
    "components/practice/Timer.jsx",
    "components/practice/Timer.module.css",
    "components/practice/ScoreDisplay.jsx",
    "components/practice/ScoreDisplay.module.css",
    "components/practice/QuestionNavigation.jsx",
    "components/practice/QuestionNavigation.module.css",
    "components/practice/QuestionCounter.jsx",
    "components/practice/QuestionCounter.module.css",
    "components/practice/ResultSummary.jsx",
    "components/practice/ResultSummary.module.css",
    "components/practice/CorrectFeedback.jsx",
    "components/practice/CorrectFeedback.module.css",
    "components/practice/WrongFeedback.jsx",
    "components/practice/WrongFeedback.module.css",
    "components/practice/HintButton.jsx",
    "components/practice/HintButton.module.css",
    "components/practice/ExplanationCard.jsx",
    "components/practice/ExplanationCard.module.css",
    "components/practice/ProgressIndicator.jsx",
    "components/practice/ProgressIndicator.module.css",
    "components/practice/DifficultySelector.jsx",
    "components/practice/DifficultySelector.module.css",
    "components/practice/SubmitButton.jsx",
    "components/practice/SubmitButton.module.css",
    "components/practice/NextButton.jsx",
    "components/practice/NextButton.module.css",
    "components/practice/SkipButton.jsx",
    "components/practice/SkipButton.module.css",
    "components/practice/ReviewAnswers.jsx",
    "components/practice/ReviewAnswers.module.css",
    "components/practice/PracticeComplete.jsx",
    "components/practice/PracticeComplete.module.css",
    "components/practice/index.js"
)
foreach ($f in $practiceComponents) { Touch-File $f }

# Test Components
$testComponents = @(
    "components/test/TestHeader.jsx",
    "components/test/TestHeader.module.css",
    "components/test/TestQuestion.jsx",
    "components/test/TestQuestion.module.css",
    "components/test/TestTimer.jsx",
    "components/test/TestTimer.module.css",
    "components/test/TestProgress.jsx",
    "components/test/TestProgress.module.css",
    "components/test/TestResult.jsx",
    "components/test/TestResult.module.css",
    "components/test/TestScoreCard.jsx",
    "components/test/TestScoreCard.module.css",
    "components/test/TestReview.jsx",
    "components/test/TestReview.module.css",
    "components/test/TestStartScreen.jsx",
    "components/test/TestStartScreen.module.css",
    "components/test/TestEndScreen.jsx",
    "components/test/TestEndScreen.module.css",
    "components/test/TestNavigation.jsx",
    "components/test/TestNavigation.module.css",
    "components/test/TestWarning.jsx",
    "components/test/TestWarning.module.css",
    "components/test/CertificateCard.jsx",
    "components/test/CertificateCard.module.css",
    "components/test/index.js"
)
foreach ($f in $testComponents) { Touch-File $f }

# Vocabulary Components
$vocabComponents = @(
    "components/vocabulary/WordCard.jsx",
    "components/vocabulary/WordCard.module.css",
    "components/vocabulary/WordList.jsx",
    "components/vocabulary/WordList.module.css",
    "components/vocabulary/WordGrid.jsx",
    "components/vocabulary/WordGrid.module.css",
    "components/vocabulary/FlashCard.jsx",
    "components/vocabulary/FlashCard.module.css",
    "components/vocabulary/FlashCardDeck.jsx",
    "components/vocabulary/FlashCardDeck.module.css",
    "components/vocabulary/WordSearch.jsx",
    "components/vocabulary/WordSearch.module.css",
    "components/vocabulary/WordFilter.jsx",
    "components/vocabulary/WordFilter.module.css",
    "components/vocabulary/WordOfTheDay.jsx",
    "components/vocabulary/WordOfTheDay.module.css",
    "components/vocabulary/WordDetail.jsx",
    "components/vocabulary/WordDetail.module.css",
    "components/vocabulary/WordExample.jsx",
    "components/vocabulary/WordExample.module.css",
    "components/vocabulary/WordPronunciation.jsx",
    "components/vocabulary/WordPronunciation.module.css",
    "components/vocabulary/WordCategory.jsx",
    "components/vocabulary/WordCategory.module.css",
    "components/vocabulary/SaveWordButton.jsx",
    "components/vocabulary/SaveWordButton.module.css",
    "components/vocabulary/VocabQuiz.jsx",
    "components/vocabulary/VocabQuiz.module.css",
    "components/vocabulary/index.js"
)
foreach ($f in $vocabComponents) { Touch-File $f }

# Essay Components
$essayComponents = @(
    "components/essay/EssayDisplay.jsx",
    "components/essay/EssayDisplay.module.css",
    "components/essay/EssayHighlight.jsx",
    "components/essay/EssayHighlight.module.css",
    "components/essay/ReadingProgress.jsx",
    "components/essay/ReadingProgress.module.css",
    "components/essay/EssayHeader.jsx",
    "components/essay/EssayHeader.module.css",
    "components/essay/Paragraph.jsx",
    "components/essay/Paragraph.module.css",
    "components/essay/KeyPhrase.jsx",
    "components/essay/KeyPhrase.module.css",
    "components/essay/TranslationToggle.jsx",
    "components/essay/TranslationToggle.module.css",
    "components/essay/VocabularyPopup.jsx",
    "components/essay/VocabularyPopup.module.css",
    "components/essay/index.js"
)
foreach ($f in $essayComponents) { Touch-File $f }

# Charts Components
$chartComponents = @(
    "components/charts/BarChart.jsx",
    "components/charts/BarChart.module.css",
    "components/charts/LineChart.jsx",
    "components/charts/LineChart.module.css",
    "components/charts/PieChart.jsx",
    "components/charts/PieChart.module.css",
    "components/charts/RadarChart.jsx",
    "components/charts/RadarChart.module.css",
    "components/charts/AreaChart.jsx",
    "components/charts/AreaChart.module.css",
    "components/charts/DonutChart.jsx",
    "components/charts/DonutChart.module.css",
    "components/charts/HeatMap.jsx",
    "components/charts/HeatMap.module.css",
    "components/charts/ScatterPlot.jsx",
    "components/charts/ScatterPlot.module.css",
    "components/charts/Sparkline.jsx",
    "components/charts/Sparkline.module.css",
    "components/charts/ChartWrapper.jsx",
    "components/charts/ChartWrapper.module.css",
    "components/charts/ChartLegend.jsx",
    "components/charts/ChartLegend.module.css",
    "components/charts/ChartTooltip.jsx",
    "components/charts/ChartTooltip.module.css",
    "components/charts/index.js"
)
foreach ($f in $chartComponents) { Touch-File $f }

# Animation Components
$animComponents = @(
    "components/animations/FadeIn.jsx",
    "components/animations/FadeIn.module.css",
    "components/animations/SlideUp.jsx",
    "components/animations/SlideUp.module.css",
    "components/animations/SlideIn.jsx",
    "components/animations/SlideIn.module.css",
    "components/animations/ScaleIn.jsx",
    "components/animations/ScaleIn.module.css",
    "components/animations/Confetti.jsx",
    "components/animations/Confetti.module.css",
    "components/animations/ParticleEffect.jsx",
    "components/animations/ParticleEffect.module.css",
    "components/animations/TextReveal.jsx",
    "components/animations/TextReveal.module.css",
    "components/animations/CountUp.jsx",
    "components/animations/CountUp.module.css",
    "components/animations/Ripple.jsx",
    "components/animations/Ripple.module.css",
    "components/animations/Pulse.jsx",
    "components/animations/Pulse.module.css",
    "components/animations/Shimmer.jsx",
    "components/animations/Shimmer.module.css",
    "components/animations/Typewriter.jsx",
    "components/animations/Typewriter.module.css",
    "components/animations/StaggerChildren.jsx",
    "components/animations/StaggerChildren.module.css",
    "components/animations/PageTransition.jsx",
    "components/animations/PageTransition.module.css",
    "components/animations/GlowEffect.jsx",
    "components/animations/GlowEffect.module.css",
    "components/animations/GradientBorder.jsx",
    "components/animations/GradientBorder.module.css",
    "components/animations/FloatingElement.jsx",
    "components/animations/FloatingElement.module.css",
    "components/animations/MorphBlob.jsx",
    "components/animations/MorphBlob.module.css",
    "components/animations/index.js"
)
foreach ($f in $animComponents) { Touch-File $f }

# Sound Components
$soundComponents = @(
    "components/sound/SoundPlayer.jsx",
    "components/sound/SoundToggle.jsx",
    "components/sound/SoundToggle.module.css",
    "components/sound/BackgroundMusic.jsx",
    "components/sound/index.js"
)
foreach ($f in $soundComponents) { Touch-File $f }

# Auth Components
$authComponents = @(
    "components/auth/LoginForm.jsx",
    "components/auth/LoginForm.module.css",
    "components/auth/RegisterForm.jsx",
    "components/auth/RegisterForm.module.css",
    "components/auth/ForgotPasswordForm.jsx",
    "components/auth/ForgotPasswordForm.module.css",
    "components/auth/SocialLogin.jsx",
    "components/auth/SocialLogin.module.css",
    "components/auth/AuthGuard.jsx",
    "components/auth/ProtectedRoute.jsx",
    "components/auth/index.js"
)
foreach ($f in $authComponents) { Touch-File $f }

# Landing Page Components
$landingComponents = @(
    "components/landing/Hero.jsx",
    "components/landing/Hero.module.css",
    "components/landing/Features.jsx",
    "components/landing/Features.module.css",
    "components/landing/FeatureCard.jsx",
    "components/landing/FeatureCard.module.css",
    "components/landing/HowItWorks.jsx",
    "components/landing/HowItWorks.module.css",
    "components/landing/Testimonials.jsx",
    "components/landing/Testimonials.module.css",
    "components/landing/TestimonialCard.jsx",
    "components/landing/TestimonialCard.module.css",
    "components/landing/Pricing.jsx",
    "components/landing/Pricing.module.css",
    "components/landing/PricingCard.jsx",
    "components/landing/PricingCard.module.css",
    "components/landing/CTA.jsx",
    "components/landing/CTA.module.css",
    "components/landing/FAQ.jsx",
    "components/landing/FAQ.module.css",
    "components/landing/Stats.jsx",
    "components/landing/Stats.module.css",
    "components/landing/LogoCloud.jsx",
    "components/landing/LogoCloud.module.css",
    "components/landing/Newsletter.jsx",
    "components/landing/Newsletter.module.css",
    "components/landing/BentoGrid.jsx",
    "components/landing/BentoGrid.module.css",
    "components/landing/GradientText.jsx",
    "components/landing/GradientText.module.css",
    "components/landing/AnimatedCounter.jsx",
    "components/landing/AnimatedCounter.module.css",
    "components/landing/ScrollAnimation.jsx",
    "components/landing/ScrollAnimation.module.css",
    "components/landing/ParallaxSection.jsx",
    "components/landing/ParallaxSection.module.css",
    "components/landing/GlassmorphismCard.jsx",
    "components/landing/GlassmorphismCard.module.css",
    "components/landing/index.js"
)
foreach ($f in $landingComponents) { Touch-File $f }

# Common Components
$commonComponents = @(
    "components/common/Logo.jsx",
    "components/common/Logo.module.css",
    "components/common/ThemeToggle.jsx",
    "components/common/ThemeToggle.module.css",
    "components/common/SearchBar.jsx",
    "components/common/SearchBar.module.css",
    "components/common/ErrorBoundary.jsx",
    "components/common/EmptyState.jsx",
    "components/common/EmptyState.module.css",
    "components/common/LoadingScreen.jsx",
    "components/common/LoadingScreen.module.css",
    "components/common/NotificationBell.jsx",
    "components/common/NotificationBell.module.css",
    "components/common/UserMenu.jsx",
    "components/common/UserMenu.module.css",
    "components/common/LanguageSwitch.jsx",
    "components/common/LanguageSwitch.module.css",
    "components/common/BackButton.jsx",
    "components/common/BackButton.module.css",
    "components/common/ShareButton.jsx",
    "components/common/ShareButton.module.css",
    "components/common/BookmarkButton.jsx",
    "components/common/BookmarkButton.module.css",
    "components/common/CopyButton.jsx",
    "components/common/CopyButton.module.css",
    "components/common/Countdown.jsx",
    "components/common/Countdown.module.css",
    "components/common/StatusBadge.jsx",
    "components/common/StatusBadge.module.css",
    "components/common/StarRating.jsx",
    "components/common/StarRating.module.css",
    "components/common/StepIndicator.jsx",
    "components/common/StepIndicator.module.css",
    "components/common/ScrollToTop.jsx",
    "components/common/ScrollToTop.module.css",
    "components/common/Announcement.jsx",
    "components/common/Announcement.module.css",
    "components/common/index.js"
)
foreach ($f in $commonComponents) { Touch-File $f }

# Gamification Components
$gameComponents = @(
    "components/gamification/XPBar.jsx",
    "components/gamification/XPBar.module.css",
    "components/gamification/LevelBadge.jsx",
    "components/gamification/LevelBadge.module.css",
    "components/gamification/StreakFlame.jsx",
    "components/gamification/StreakFlame.module.css",
    "components/gamification/AchievementPopup.jsx",
    "components/gamification/AchievementPopup.module.css",
    "components/gamification/BadgeCollection.jsx",
    "components/gamification/BadgeCollection.module.css",
    "components/gamification/DailyChallenge.jsx",
    "components/gamification/DailyChallenge.module.css",
    "components/gamification/Milestone.jsx",
    "components/gamification/Milestone.module.css",
    "components/gamification/CoinCounter.jsx",
    "components/gamification/CoinCounter.module.css",
    "components/gamification/LeaderboardRow.jsx",
    "components/gamification/LeaderboardRow.module.css",
    "components/gamification/index.js"
)
foreach ($f in $gameComponents) { Touch-File $f }

# ============================================================
# DATA - TOPIC CONTENT (ALL 6 TOPICS + SUBTOPICS)
# ============================================================
Write-Host "  [5/20] Data files for topics and subtopics..." -ForegroundColor Yellow

# Files needed for each topic/subtopic
$contentFiles = @(
    "concept.json",
    "vocabulary.json",
    "practice-questions.json",
    "practice-answers.json",
    "test-questions.json",
    "test-answers.json",
    "essay.json",
    "common-errors.json",
    "rules.json",
    "examples.json",
    "formulas.json",
    "tips.json",
    "daily-usage.json",
    "professional-usage.json"
)

# Topics and their subtopics
$topicsMap = @{
    "01-imperative-sentences" = @(
        "01-affirmative-imperative",
        "02-negative-imperative",
        "03-polite-imperative-please-kindly",
        "04-lets-imperative",
        "05-imperative-with-always-never",
        "06-imperative-with-question-tags",
        "07-imperative-for-advice-suggestions",
        "08-imperative-for-requests-orders",
        "09-imperative-for-warnings-instructions",
        "10-imperative-in-daily-life",
        "11-imperative-in-professional-settings",
        "12-imperative-in-conversations"
    )
    "02-be-verb" = @(
        "01-is-am-are-present-tense",
        "02-was-were-past-tense",
        "03-will-be-future-tense",
        "04-be-verb-negative-sentences",
        "05-be-verb-interrogative-questions",
        "06-be-verb-short-forms-contractions",
        "07-be-verb-with-adjectives",
        "08-be-verb-with-nouns",
        "09-be-verb-with-prepositions",
        "10-be-verb-with-adverbs",
        "11-be-verb-in-wh-questions",
        "12-be-verb-in-tag-questions",
        "13-be-verb-in-daily-conversation",
        "14-be-verb-in-professional-english",
        "15-be-verb-common-mistakes"
    )
    "03-demonstrative-pronouns" = @(
        "01-this-singular-near",
        "02-that-singular-far",
        "03-these-plural-near",
        "04-those-plural-far",
        "05-this-that-comparison",
        "06-these-those-comparison",
        "07-demonstrative-in-questions",
        "08-demonstrative-in-negative",
        "09-demonstrative-as-subject",
        "10-demonstrative-as-adjective",
        "11-demonstrative-vs-articles",
        "12-demonstrative-in-daily-life",
        "13-demonstrative-in-professional-settings",
        "14-demonstrative-common-mistakes"
    )
    "04-has-have-had-will-have" = @(
        "01-has-third-person-singular",
        "02-have-first-second-plural",
        "03-had-past-tense",
        "04-will-have-future-tense",
        "05-has-have-negative-sentences",
        "06-has-have-interrogative-questions",
        "07-has-have-short-forms",
        "08-has-have-with-got",
        "09-has-have-for-possession",
        "10-has-have-for-experience",
        "11-has-have-for-obligation",
        "12-has-have-in-present-perfect",
        "13-had-in-past-perfect",
        "14-will-have-in-future-perfect",
        "15-has-have-in-daily-life",
        "16-has-have-in-professional-settings",
        "17-has-have-common-mistakes"
    )
    "05-use-of-there" = @(
        "01-there-is-singular-present",
        "02-there-are-plural-present",
        "03-there-was-singular-past",
        "04-there-were-plural-past",
        "05-there-will-be-future",
        "06-there-has-been-present-perfect",
        "07-there-had-been-past-perfect",
        "08-there-negative-sentences",
        "09-there-interrogative-questions",
        "10-there-with-some-any-many-much",
        "11-there-with-countable-uncountable",
        "12-there-vs-it",
        "13-there-vs-their-they-are",
        "14-there-in-daily-life",
        "15-there-in-professional-settings",
        "16-there-common-mistakes"
    )
    "06-use-of-want" = @(
        "01-want-present-tense-i-want",
        "02-want-third-person-wants",
        "03-wanted-past-tense",
        "04-will-want-future-tense",
        "05-want-negative-sentences",
        "06-want-interrogative-questions",
        "07-want-to-plus-verb-infinitive",
        "08-want-someone-to-do-something",
        "09-want-vs-need",
        "10-want-vs-would-like",
        "11-want-vs-wish",
        "12-want-in-polite-requests",
        "13-want-in-daily-life",
        "14-want-in-professional-settings",
        "15-want-common-mistakes"
    )
}

# Create data files for each topic and subtopic
Touch-File "data/topics/topics-list.json"
Touch-File "data/topics/topics-order.json"
Touch-File "data/topics/topics-meta.json"

foreach ($topic in $topicsMap.Keys) {
    # Main topic files
    foreach ($file in $contentFiles) {
        Touch-File "data/topics/$topic/$file"
    }
    Touch-File "data/topics/$topic/meta.json"
    Touch-File "data/topics/$topic/subtopics-list.json"
    
    # Subtopic files
    foreach ($subtopic in $topicsMap[$topic]) {
        foreach ($file in $contentFiles) {
            Touch-File "data/topics/$topic/subtopics/$subtopic/$file"
        }
        Touch-File "data/topics/$topic/subtopics/$subtopic/meta.json"
    }
}

# ============================================================
# VOCABULARY BANK DATA
# ============================================================
Write-Host "  [6/20] Vocabulary bank data..." -ForegroundColor Yellow

$vocabData = @(
    "data/vocabulary-bank/daily-words.json",
    "data/vocabulary-bank/professional-words.json",
    "data/vocabulary-bank/office-words.json",
    "data/vocabulary-bank/business-words.json",
    "data/vocabulary-bank/interview-words.json",
    "data/vocabulary-bank/meeting-words.json",
    "data/vocabulary-bank/email-words.json",
    "data/vocabulary-bank/presentation-words.json",
    "data/vocabulary-bank/negotiation-words.json",
    "data/vocabulary-bank/networking-words.json",
    "data/vocabulary-bank/common-verbs.json",
    "data/vocabulary-bank/phrasal-verbs.json",
    "data/vocabulary-bank/irregular-verbs.json",
    "data/vocabulary-bank/regular-verbs.json",
    "data/vocabulary-bank/modal-verbs.json",
    "data/vocabulary-bank/action-verbs.json",
    "data/vocabulary-bank/stative-verbs.json",
    "data/vocabulary-bank/common-adjectives.json",
    "data/vocabulary-bank/common-adverbs.json",
    "data/vocabulary-bank/common-nouns.json",
    "data/vocabulary-bank/common-prepositions.json",
    "data/vocabulary-bank/common-conjunctions.json",
    "data/vocabulary-bank/common-interjections.json",
    "data/vocabulary-bank/common-phrases.json",
    "data/vocabulary-bank/idioms.json",
    "data/vocabulary-bank/proverbs.json",
    "data/vocabulary-bank/collocations.json",
    "data/vocabulary-bank/slang-informal.json",
    "data/vocabulary-bank/formal-expressions.json",
    "data/vocabulary-bank/transition-words.json",
    "data/vocabulary-bank/emotion-words.json",
    "data/vocabulary-bank/time-words.json",
    "data/vocabulary-bank/place-words.json",
    "data/vocabulary-bank/food-words.json",
    "data/vocabulary-bank/travel-words.json",
    "data/vocabulary-bank/technology-words.json",
    "data/vocabulary-bank/health-words.json",
    "data/vocabulary-bank/education-words.json",
    "data/vocabulary-bank/sports-words.json",
    "data/vocabulary-bank/weather-words.json",
    "data/vocabulary-bank/family-words.json",
    "data/vocabulary-bank/clothing-words.json",
    "data/vocabulary-bank/shopping-words.json",
    "data/vocabulary-bank/entertainment-words.json",
    "data/vocabulary-bank/nature-words.json",
    "data/vocabulary-bank/categories.json",
    "data/vocabulary-bank/word-of-the-day-list.json",
    "data/vocabulary-bank/vocabulary-meta.json"
)
foreach ($f in $vocabData) { Touch-File $f }

# ============================================================
# GRAMMAR REFERENCE DATA
# ============================================================
Write-Host "  [7/20] Grammar reference data..." -ForegroundColor Yellow

$grammarData = @(
    "data/grammar-reference/parts-of-speech.json",
    "data/grammar-reference/sentence-structure.json",
    "data/grammar-reference/tenses-overview.json",
    "data/grammar-reference/active-passive-voice.json",
    "data/grammar-reference/direct-indirect-speech.json",
    "data/grammar-reference/punctuation-rules.json",
    "data/grammar-reference/capitalization-rules.json",
    "data/grammar-reference/articles-rules.json",
    "data/grammar-reference/preposition-rules.json",
    "data/grammar-reference/conjunction-rules.json",
    "data/grammar-reference/pronoun-rules.json",
    "data/grammar-reference/adjective-rules.json",
    "data/grammar-reference/adverb-rules.json",
    "data/grammar-reference/verb-rules.json",
    "data/grammar-reference/noun-rules.json",
    "data/grammar-reference/common-grammar-mistakes.json",
    "data/grammar-reference/grammar-formulas.json",
    "data/grammar-reference/grammar-tips.json",
    "data/grammar-reference/index.json"
)
foreach ($f in $grammarData) { Touch-File $f }

# ============================================================
# CONVERSATION / DAILY PRACTICE DATA
# ============================================================
Write-Host "  [8/20] Daily practice & conversation data..." -ForegroundColor Yellow

$dailyData = @(
    "data/daily-practice/greetings.json",
    "data/daily-practice/introductions.json",
    "data/daily-practice/asking-directions.json",
    "data/daily-practice/ordering-food.json",
    "data/daily-practice/shopping.json",
    "data/daily-practice/phone-conversations.json",
    "data/daily-practice/making-appointments.json",
    "data/daily-practice/small-talk.json",
    "data/daily-practice/compliments.json",
    "data/daily-practice/apologies.json",
    "data/daily-practice/thanking.json",
    "data/daily-practice/requesting.json",
    "data/daily-practice/agreeing-disagreeing.json",
    "data/daily-practice/opinions.json",
    "data/daily-practice/suggestions.json",
    "data/daily-practice/complaints.json",
    "data/daily-practice/emergencies.json",
    "data/daily-practice/weather-talk.json",
    "data/daily-practice/hobbies.json",
    "data/daily-practice/family-talk.json",
    "data/daily-practice/work-talk.json",
    "data/daily-practice/interview-conversations.json",
    "data/daily-practice/meeting-conversations.json",
    "data/daily-practice/email-writing.json",
    "data/daily-practice/presentation-phrases.json",
    "data/daily-practice/negotiation-phrases.json",
    "data/daily-practice/daily-routines.json",
    "data/daily-practice/travel-conversations.json",
    "data/daily-practice/hospital-conversations.json",
    "data/daily-practice/bank-conversations.json",
    "data/daily-practice/categories.json"
)
foreach ($f in $dailyData) { Touch-File $f }

# ============================================================
# GAMIFICATION DATA
# ============================================================
Write-Host "  [9/20] Gamification data..." -ForegroundColor Yellow

$gameData = @(
    "data/gamification/badges.json",
    "data/gamification/levels.json",
    "data/gamification/achievements.json",
    "data/gamification/milestones.json",
    "data/gamification/rewards.json",
    "data/gamification/challenges.json",
    "data/gamification/streaks.json",
    "data/gamification/xp-rules.json",
    "data/gamification/leaderboard-config.json",
    "data/gamification/motivational-quotes.json"
)
foreach ($f in $gameData) { Touch-File $f }

# ============================================================
# HOOKS
# ============================================================
Write-Host "  [10/20] Custom hooks..." -ForegroundColor Yellow

$hooks = @(
    "hooks/useAuth.js",
    "hooks/useScore.js",
    "hooks/useProgress.js",
    "hooks/useSound.js",
    "hooks/useTimer.js",
    "hooks/useLocalStorage.js",
    "hooks/useTheme.js",
    "hooks/useAnimation.js",
    "hooks/useMediaQuery.js",
    "hooks/useDebounce.js",
    "hooks/useIntersectionObserver.js",
    "hooks/useOnClickOutside.js",
    "hooks/useKeyPress.js",
    "hooks/useScrollPosition.js",
    "hooks/useWindowSize.js",
    "hooks/usePagination.js",
    "hooks/useSearch.js",
    "hooks/useFilter.js",
    "hooks/useSort.js",
    "hooks/useForm.js",
    "hooks/useToast.js",
    "hooks/useModal.js",
    "hooks/useConfetti.js",
    "hooks/useCountdown.js",
    "hooks/useStreak.js",
    "hooks/useXP.js",
    "hooks/useVocabulary.js",
    "hooks/useQuestions.js",
    "hooks/useTest.js",
    "hooks/usePractice.js",
    "hooks/useBookmarks.js",
    "hooks/useNotes.js",
    "hooks/index.js"
)
foreach ($f in $hooks) { Touch-File $f }

# ============================================================
# LIB / UTILITIES
# ============================================================
Write-Host "  [11/20] Lib & utilities..." -ForegroundColor Yellow

$lib = @(
    "lib/utils.js",
    "lib/constants.js",
    "lib/helpers.js",
    "lib/validators.js",
    "lib/formatters.js",
    "lib/storage.js",
    "lib/sounds.js",
    "lib/api.js",
    "lib/cn.js",
    "lib/score-calculator.js",
    "lib/progress-tracker.js",
    "lib/question-shuffler.js",
    "lib/timer-utils.js",
    "lib/analytics.js",
    "lib/seo.js",
    "lib/date-utils.js",
    "lib/string-utils.js",
    "lib/array-utils.js",
    "lib/number-utils.js",
    "lib/color-utils.js",
    "lib/animation-utils.js",
    "lib/theme-utils.js",
    "lib/auth-utils.js",
    "lib/error-handler.js",
    "lib/logger.js",
    "lib/debounce.js",
    "lib/throttle.js",
    "lib/clipboard.js",
    "lib/share.js",
    "lib/download.js",
    "lib/index.js"
)
foreach ($f in $lib) { Touch-File $f }

# ============================================================
# CONTEXT PROVIDERS
# ============================================================
Write-Host "  [12/20] Context providers..." -ForegroundColor Yellow

$context = @(
    "context/AuthContext.js",
    "context/ThemeContext.js",
    "context/ScoreContext.js",
    "context/ProgressContext.js",
    "context/SoundContext.js",
    "context/SettingsContext.js",
    "context/TopicContext.js",
    "context/QuestionContext.js",
    "context/NotificationContext.js",
    "context/ModalContext.js",
    "context/ToastContext.js",
    "context/AppProviders.js",
    "context/index.js"
)
foreach ($f in $context) { Touch-File $f }

# ============================================================
# STORE (ZUSTAND)
# ============================================================
Write-Host "  [13/20] State management (stores)..." -ForegroundColor Yellow

$store = @(
    "store/useAuthStore.js",
    "store/useScoreStore.js",
    "store/useProgressStore.js",
    "store/useSettingsStore.js",
    "store/useTopicStore.js",
    "store/useQuestionStore.js",
    "store/useVocabularyStore.js",
    "store/useTimerStore.js",
    "store/useUIStore.js",
    "store/useSoundStore.js",
    "store/useBookmarkStore.js",
    "store/useNoteStore.js",
    "store/useAchievementStore.js",
    "store/useStreakStore.js",
    "store/useSearchStore.js",
    "store/index.js"
)
foreach ($f in $store) { Touch-File $f }

# ============================================================
# CONFIG
# ============================================================
Write-Host "  [14/20] Config files..." -ForegroundColor Yellow

$config = @(
    "config/site.js",
    "config/navigation.js",
    "config/topics.js",
    "config/seo.js",
    "config/theme.js",
    "config/sounds.js",
    "config/animations.js",
    "config/gamification.js",
    "config/levels.js",
    "config/routes.js",
    "config/api-endpoints.js",
    "config/metadata.js",
    "config/fonts.js",
    "config/colors.js",
    "config/breakpoints.js",
    "config/index.js"
)
foreach ($f in $config) { Touch-File $f }

# ============================================================
# STYLES
# ============================================================
Write-Host "  [15/20] Styles..." -ForegroundColor Yellow

$styles = @(
    "styles/variables.css",
    "styles/reset.css",
    "styles/typography.css",
    "styles/animations.css",
    "styles/keyframes.css",
    "styles/components.css",
    "styles/layout.css",
    "styles/responsive.css",
    "styles/utilities.css",
    "styles/glassmorphism.css",
    "styles/neumorphism.css",
    "styles/gradients.css",
    "styles/shadows.css",
    "styles/scrollbar.css",
    "styles/selection.css",
    "styles/print.css",
    "styles/themes/light.css",
    "styles/themes/dark.css",
    "styles/themes/midnight.css",
    "styles/themes/ocean.css",
    "styles/themes/forest.css",
    "styles/themes/sunset.css",
    "styles/pages/home.module.css",
    "styles/pages/dashboard.module.css",
    "styles/pages/topics.module.css",
    "styles/pages/practice.module.css",
    "styles/pages/test.module.css",
    "styles/pages/vocabulary.module.css",
    "styles/pages/progress.module.css",
    "styles/pages/scores.module.css",
    "styles/pages/profile.module.css",
    "styles/pages/settings.module.css",
    "styles/pages/auth.module.css",
    "styles/pages/landing.module.css",
    "styles/pages/achievements.module.css",
    "styles/pages/leaderboard.module.css",
    "styles/pages/daily-practice.module.css",
    "styles/pages/grammar-reference.module.css",
    "styles/pages/essay.module.css",
    "styles/pages/quick-test.module.css"
)
foreach ($f in $styles) { Touch-File $f }

# ============================================================
# PUBLIC ASSETS
# ============================================================
Write-Host "  [16/20] Public assets..." -ForegroundColor Yellow

$public = @(
    # Sounds
    "public/sounds/correct.mp3",
    "public/sounds/wrong.mp3",
    "public/sounds/complete.mp3",
    "public/sounds/click.mp3",
    "public/sounds/achievement.mp3",
    "public/sounds/level-up.mp3",
    "public/sounds/streak.mp3",
    "public/sounds/notification.mp3",
    "public/sounds/countdown.mp3",
    "public/sounds/perfect-score.mp3",
    "public/sounds/game-over.mp3",
    "public/sounds/coin.mp3",
    "public/sounds/whoosh.mp3",
    "public/sounds/pop.mp3",
    "public/sounds/ding.mp3",
    "public/sounds/cheer.mp3",
    "public/sounds/tap.mp3",
    "public/sounds/slide.mp3",
    "public/sounds/success-fanfare.mp3",
    "public/sounds/badge-earned.mp3",
    
    # Images - Logo & Branding
    "public/images/logo.svg",
    "public/images/logo-dark.svg",
    "public/images/logo-icon.svg",
    "public/images/logo-full.svg",
    "public/images/hero-bg.svg",
    "public/images/pattern-bg.svg",
    "public/images/gradient-bg.svg",
    "public/images/noise-texture.png",
    
    # Images - Topic Icons
    "public/images/topics/imperative-sentences.svg",
    "public/images/topics/be-verb.svg",
    "public/images/topics/demonstrative-pronouns.svg",
    "public/images/topics/has-have-had.svg",
    "public/images/topics/use-of-there.svg",
    "public/images/topics/use-of-want.svg",
    "public/images/topics/default-topic.svg",
    
    # Images - Badges
    "public/images/badges/beginner.svg",
    "public/images/badges/intermediate.svg",
    "public/images/badges/advanced.svg",
    "public/images/badges/expert.svg",
    "public/images/badges/master.svg",
    "public/images/badges/legend.svg",
    "public/images/badges/perfect-score.svg",
    "public/images/badges/streak-7.svg",
    "public/images/badges/streak-30.svg",
    "public/images/badges/streak-100.svg",
    "public/images/badges/first-test.svg",
    "public/images/badges/first-perfect.svg",
    "public/images/badges/vocabulary-hero.svg",
    "public/images/badges/grammar-guru.svg",
    "public/images/badges/quick-learner.svg",
    "public/images/badges/consistent.svg",
    "public/images/badges/speed-demon.svg",
    "public/images/badges/bookworm.svg",
    
    # Images - Illustrations
    "public/images/illustrations/welcome.svg",
    "public/images/illustrations/success.svg",
    "public/images/illustrations/error.svg",
    "public/images/illustrations/empty.svg",
    "public/images/illustrations/learning.svg",
    "public/images/illustrations/achievement.svg",
    "public/images/illustrations/celebration.svg",
    "public/images/illustrations/studying.svg",
    "public/images/illustrations/reading.svg",
    "public/images/illustrations/writing.svg",
    "public/images/illustrations/speaking.svg",
    "public/images/illustrations/thinking.svg",
    "public/images/illustrations/completed.svg",
    "public/images/illustrations/locked.svg",
    "public/images/illustrations/not-found.svg",
    "public/images/illustrations/maintenance.svg",
    "public/images/illustrations/onboarding-1.svg",
    "public/images/illustrations/onboarding-2.svg",
    "public/images/illustrations/onboarding-3.svg",
    "public/images/illustrations/streak-fire.svg",
    "public/images/illustrations/level-up.svg",
    "public/images/illustrations/confetti.svg",
    "public/images/illustrations/trophy.svg",
    "public/images/illustrations/rocket.svg",
    "public/images/illustrations/brain.svg",
    "public/images/illustrations/book.svg",
    "public/images/illustrations/globe.svg",
    "public/images/illustrations/chat.svg",
    "public/images/illustrations/office.svg",
    "public/images/illustrations/conversation.svg",
    
    # Images - Avatars
    "public/images/avatars/default.svg",
    "public/images/avatars/avatar-1.svg",
    "public/images/avatars/avatar-2.svg",
    "public/images/avatars/avatar-3.svg",
    "public/images/avatars/avatar-4.svg",
    "public/images/avatars/avatar-5.svg",
    "public/images/avatars/avatar-6.svg",
    "public/images/avatars/avatar-7.svg",
    "public/images/avatars/avatar-8.svg",
    
    # Images - OG
    "public/images/og/og-image.png",
    "public/images/og/og-dashboard.png",
    "public/images/og/og-topics.png",
    
    # Images - Screenshots
    "public/images/screenshots/dashboard-preview.png",
    "public/images/screenshots/practice-preview.png",
    "public/images/screenshots/test-preview.png",
    "public/images/screenshots/mobile-preview.png",
    
    # Images - Backgrounds
    "public/images/backgrounds/hero-gradient.svg",
    "public/images/backgrounds/mesh-gradient-1.svg",
    "public/images/backgrounds/mesh-gradient-2.svg",
    "public/images/backgrounds/dots-pattern.svg",
    "public/images/backgrounds/grid-pattern.svg",
    "public/images/backgrounds/wave-pattern.svg",
    "public/images/backgrounds/circle-pattern.svg",
    "public/images/backgrounds/blur-1.svg",
    "public/images/backgrounds/blur-2.svg",
    "public/images/backgrounds/aurora.svg",
    
    # Icons
    "public/icons/favicon.ico",
    "public/icons/apple-touch-icon.png",
    "public/icons/icon-16.png",
    "public/icons/icon-32.png",
    "public/icons/icon-192.png",
    "public/icons/icon-512.png",
    "public/icons/icon-maskable.png",
    "public/icons/safari-pinned-tab.svg",
    "public/icons/mstile-150x150.png",
    "public/icons/browserconfig.xml",
    
    # Fonts
    "public/fonts/.gitkeep",
    
    # Videos
    "public/videos/hero-animation.mp4",
    "public/videos/feature-demo.mp4",
    "public/videos/.gitkeep",
    
    # Lottie Animations
    "public/lottie/loading.json",
    "public/lottie/success.json",
    "public/lottie/error.json",
    "public/lottie/celebration.json",
    "public/lottie/confetti.json",
    "public/lottie/rocket.json",
    "public/lottie/fire.json",
    "public/lottie/star.json",
    "public/lottie/trophy.json",
    "public/lottie/thinking.json",
    "public/lottie/writing.json",
    "public/lottie/reading.json",
    "public/lottie/waving.json",
    "public/lottie/checkmark.json",
    "public/lottie/cross.json",
    "public/lottie/coin.json",
    "public/lottie/level-up.json"
)
foreach ($f in $public) { Touch-File $f }

# ============================================================
# SERVICES
# ============================================================
Write-Host "  [17/20] Services..." -ForegroundColor Yellow

$services = @(
    "services/auth-service.js",
    "services/topic-service.js",
    "services/question-service.js",
    "services/score-service.js",
    "services/progress-service.js",
    "services/vocabulary-service.js",
    "services/user-service.js",
    "services/analytics-service.js",
    "services/sound-service.js",
    "services/notification-service.js",
    "services/storage-service.js",
    "services/bookmark-service.js",
    "services/note-service.js",
    "services/achievement-service.js",
    "services/streak-service.js",
    "services/export-service.js",
    "services/search-service.js",
    "services/cache-service.js",
    "services/index.js"
)
foreach ($f in $services) { Touch-File $f }

# ============================================================
# TYPES / SCHEMAS
# ============================================================
Write-Host "  [18/20] Types & schemas..." -ForegroundColor Yellow

$types = @(
    "types/topic.js",
    "types/subtopic.js",
    "types/question.js",
    "types/answer.js",
    "types/score.js",
    "types/progress.js",
    "types/user.js",
    "types/vocabulary.js",
    "types/essay.js",
    "types/achievement.js",
    "types/badge.js",
    "types/streak.js",
    "types/settings.js",
    "types/notification.js",
    "types/bookmark.js",
    "types/note.js",
    "types/chart.js",
    "types/index.js"
)
foreach ($f in $types) { Touch-File $f }

# ============================================================
# CONSTANTS
# ============================================================
Write-Host "  [19/20] Constants..." -ForegroundColor Yellow

$constants = @(
    "constants/routes.js",
    "constants/api-endpoints.js",
    "constants/colors.js",
    "constants/breakpoints.js",
    "constants/font-sizes.js",
    "constants/spacing.js",
    "constants/animations.js",
    "constants/sounds.js",
    "constants/levels.js",
    "constants/xp.js",
    "constants/badges.js",
    "constants/messages.js",
    "constants/error-messages.js",
    "constants/success-messages.js",
    "constants/question-types.js",
    "constants/difficulty-levels.js",
    "constants/topics.js",
    "constants/regex.js",
    "constants/limits.js",
    "constants/index.js"
)
foreach ($f in $constants) { Touch-File $f }

# ============================================================
# ADDITIONAL SUPPORT FILES
# ============================================================
Write-Host "  [20/20] Additional support files..." -ForegroundColor Yellow

$additional = @(
    # Providers
    "providers/ThemeProvider.jsx",
    "providers/AuthProvider.jsx",
    "providers/SoundProvider.jsx",
    "providers/ToastProvider.jsx",
    "providers/AnalyticsProvider.jsx",
    "providers/AppProvider.jsx",
    "providers/index.js",
    
    # Middleware / Guards
    "middleware/auth-middleware.js",
    "middleware/rate-limiter.js",
    "middleware/cors.js",
    "middleware/index.js",
    
    # Layouts (reusable)
    "layouts/AuthLayout.jsx",
    "layouts/AuthLayout.module.css",
    "layouts/DashboardLayout.jsx",
    "layouts/DashboardLayout.module.css",
    "layouts/TopicLayout.jsx",
    "layouts/TopicLayout.module.css",
    "layouts/MarketingLayout.jsx",
    "layouts/MarketingLayout.module.css",
    "layouts/TestLayout.jsx",
    "layouts/TestLayout.module.css",
    "layouts/PracticeLayout.jsx",
    "layouts/PracticeLayout.module.css",
    "layouts/index.js",
    
    # SEO
    "seo/meta-tags.js",
    "seo/json-ld.js",
    "seo/open-graph.js",
    "seo/twitter-card.js",
    "seo/index.js",
    
    # i18n (internationalization)
    "i18n/en.json",
    "i18n/hi.json",
    "i18n/config.js",
    "i18n/index.js",
    
    # Database / Data layer
    "database/schema.js",
    "database/seed.js",
    "database/migrations.js",
    "database/queries.js",
    "database/index.js",
    
    # Validation
    "validations/auth-validation.js",
    "validations/user-validation.js",
    "validations/answer-validation.js",
    "validations/settings-validation.js",
    "validations/index.js",
    
    # Error handling
    "errors/AppError.js",
    "errors/AuthError.js",
    "errors/NotFoundError.js",
    "errors/ValidationError.js",
    "errors/error-codes.js",
    "errors/index.js",
    
    # Email templates
    "emails/welcome.js",
    "emails/reset-password.js",
    "emails/verification.js",
    "emails/weekly-report.js",
    "emails/achievement.js",
    "emails/index.js",
    
    # Documentation
    "docs/API.md",
    "docs/ARCHITECTURE.md",
    "docs/COMPONENTS.md",
    "docs/CONTRIBUTING.md",
    "docs/DATA-STRUCTURE.md",
    "docs/DEPLOYMENT.md",
    "docs/DESIGN-SYSTEM.md",
    "docs/FOLDER-STRUCTURE.md",
    "docs/GAMIFICATION.md",
    "docs/GETTING-STARTED.md",
    "docs/ROADMAP.md",
    "docs/TOPICS-GUIDE.md",
    "docs/SCORING-SYSTEM.md",
    "docs/CHANGELOG.md"
)
foreach ($f in $additional) { Touch-File $f }

# ============================================================
# COUNT FILES
# ============================================================
$totalFiles = (Get-ChildItem -Path $base -Recurse -File | Where-Object { $_.Name -ne "create-structure.ps1" }).Count
$totalDirs = (Get-ChildItem -Path $base -Recurse -Directory).Count

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  STRUCTURE CREATED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Total Files: $totalFiles" -ForegroundColor Cyan
Write-Host "  Total Folders: $totalDirs" -ForegroundColor Cyan
Write-Host "  Ready for Vercel deployment!" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Green
