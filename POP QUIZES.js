document.addEventListener('DOMContentLoaded', () => {
    
    const quizQuestions = [
        {
            question: "What is the main greenhouse gas responsible for recent climate change?",
            options: ["Carbon dioxide (CO₂)", "Methane (CH₄)", "Nitrous oxide (N₂O)", "Water vapor (H₂O)"],
            answer: "Carbon dioxide (CO₂)",
            explanation: "While all these gases contribute to the greenhouse effect, CO₂ from burning fossil fuels is the primary driver of recent climate change due to its massive increase since the Industrial Revolution."
        },
        {
            question: "Which of these is NOT a consequence of climate change?",
            options: ["Rising sea levels", "More intense hurricanes", "Increased volcanic activity", "Shifting wildlife populations"],
            answer: "Increased volcanic activity",
            explanation: "Climate change doesn't directly affect volcanic activity. However, rising temperatures do cause sea level rise, more extreme weather events, and force species to migrate."
        },
        {
            question: "What percentage of climate scientists agree that humans are causing global warming?",
            options: ["50-60%", "70-80%", "85-90%", "97% or more"],
            answer: "97% or more",
            explanation: "Multiple studies have found that 97% or more of actively publishing climate scientists agree that human activities are causing global warming."
        },
        {
            question: "Which of these is the most effective action an individual can take to reduce their carbon footprint?",
            options: ["Recycling", "Using LED lightbulbs", "Eating a plant-based diet", "Driving a hybrid car"],
            answer: "Eating a plant-based diet",
            explanation: "While all these help, a plant-based diet has the biggest impact. Animal agriculture accounts for about 14.5% of global greenhouse gas emissions."
        },
        {
            question: "How much has the global average temperature increased since the late 19th century?",
            options: ["0.5°C", "1.0°C", "1.5°C", "2.0°C"],
            answer: "1.0°C",
            explanation: "The Earth's average surface temperature has risen about 1.0°C since the late 19th century, with most warming occurring in the past 35 years."
        },
        {
            question: "What is the Paris Agreement's main goal for global temperature rise?",
            options: ["Limit to 1.5°C above pre-industrial levels", "Limit to 2.0°C above pre-industrial levels", "Limit to 3.0°C above pre-industrial levels", "No specific temperature target"],
            answer: "Limit to 1.5°C above pre-industrial levels",
            explanation: "The Paris Agreement aims to limit global temperature increase to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels."
        },
        {
            question: "Which sector is the largest contributor to greenhouse gas emissions globally?",
            options: ["Transportation", "Agriculture", "Electricity and heat production", "Industry"],
            answer: "Electricity and heat production",
            explanation: "Electricity and heat production account for about 25% of global greenhouse gas emissions, primarily from burning coal and natural gas."
        },
        {
            question: "What is 'carbon sequestration'?",
            options: ["Storing carbon in underground reservoirs", "Planting trees to absorb CO₂", "Capturing CO₂ from the atmosphere", "All of the above"],
            answer: "All of the above",
            explanation: "Carbon sequestration refers to various methods of capturing and storing atmospheric CO₂, including natural methods like forests and technological solutions."
        },
        {
            question: "Which of these renewable energy sources has grown the most in the past decade?",
            options: ["Hydropower", "Wind power", "Solar power", "Geothermal"],
            answer: "Solar power",
            explanation: "Solar power has seen the fastest growth, with global capacity increasing about 18 times between 2010 and 2020 due to falling costs."
        },
        {
            question: "What is the 'albedo effect' in climate science?",
            options: ["The reflection of sunlight by Earth's surface", "The absorption of CO₂ by oceans", "The trapping of heat by greenhouse gases", "The movement of heat through ocean currents"],
            answer: "The reflection of sunlight by Earth's surface",
            explanation: "The albedo effect refers to how much sunlight is reflected by Earth's surface. Ice and snow have high albedo, reflecting sunlight, while darker surfaces absorb more heat."
        }
    ];

    
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const scoreElement = document.getElementById('score');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackContent = document.getElementById('feedback-content');
    const continueBtn = document.getElementById('continue-btn');
    const resultContainer = document.getElementById('result-container');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const mercury = document.getElementById('mercury');
    const planetResult = document.getElementById('planet-result');
    const resultFacts = document.getElementById('result-facts');
    const restartBtn = document.getElementById('restart-btn');
    const shareBtn = document.getElementById('share-btn');

    
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOptions = new Array(quizQuestions.length).fill(null);
    let quizCompleted = false;
    let showFeedback = false;

    
    function initQuiz() {
        showQuestion();
        updateProgressBar();
        updateButtons();
    }

    
    function showQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        questionElement.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.classList.add('option-btn');
            optionElement.textContent = option;
            
            
            const icon = document.createElement('i');
            icon.className = 'far fa-circle';
            optionElement.prepend(icon);
            
            
            if (selectedOptions[currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
                icon.className = 'far fa-check-circle';
            }
            
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        feedbackContainer.style.display = 'none';
        showFeedback = false;
        
        
        const questionContainer = document.getElementById('question-container');
        questionContainer.classList.remove('animate__fadeInUp');
        void questionContainer.offsetWidth; 
        questionContainer.classList.add('animate__fadeInUp');
    }

    
    function selectOption(optionIndex) {
        if (quizCompleted || showFeedback) return;
        
        const options = document.querySelectorAll('.option-btn');
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
    
        options.forEach(option => {
            const icon = option.querySelector('i');
            icon.className = 'far fa-circle';
            option.classList.remove('selected', 'correct', 'incorrect');
        });
        
    
        options[optionIndex].classList.add('selected');
        const selectedIcon = options[optionIndex].querySelector('i');
        selectedIcon.className = 'far fa-check-circle';
        selectedOptions[currentQuestionIndex] = optionIndex;
        
        
        const isCorrect = currentQuestion.options[optionIndex] === currentQuestion.answer;
        
        if (isCorrect) {
            options[optionIndex].classList.add('correct');
            
            
            if (!options[optionIndex].classList.contains('score-counted')) {
                score++;
                scoreElement.textContent = score;
                options[optionIndex].classList.add('score-counted');
                
                
                scoreElement.classList.add('animate__animated', 'animate__bounceIn');
                setTimeout(() => {
                    scoreElement.classList.remove('animate__animated', 'animate__bounceIn');
                }, 1000);
            }
        } else {
            options[optionIndex].classList.add('incorrect');
            
            const correctIndex = currentQuestion.options.indexOf(currentQuestion.answer);
            options[correctIndex].classList.add('correct');
            const correctIcon = options[correctIndex].querySelector('i');
            correctIcon.className = 'far fa-check-circle';
        }
        
        
        showQuestionFeedback(isCorrect, currentQuestion.explanation);
    }

    
    function showQuestionFeedback(isCorrect, explanation) {
        showFeedback = true;
        
        feedbackContent.innerHTML = isCorrect 
            ? `<strong>Correct!</strong> ${explanation}`
            : `<strong>Incorrect.</strong> ${explanation}`;
        
        feedbackContainer.style.display = 'block';
        feedbackContainer.className = 'feedback-container animate__animated animate__fadeIn';
        
        
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
    }

    
    function updateButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = selectedOptions[currentQuestionIndex] === null && !showFeedback;
        
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.textContent = 'Finish';
            nextBtn.innerHTML = 'Finish <i class="fas fa-flag-checkered"></i>';
        } else {
            nextBtn.textContent = 'Next';
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    
    function showNextQuestion() {
        if (showFeedback) {
            
            feedbackContainer.classList.remove('animate__fadeIn');
            feedbackContainer.classList.add('animate__fadeOut');
            
            setTimeout(() => {
                feedbackContainer.style.display = 'none';
                showFeedback = false;
                
                
                if (currentQuestionIndex === quizQuestions.length - 1) {
                    submitQuiz();
                } else {
                    currentQuestionIndex++;
                    showQuestion();
                    updateProgressBar();
                    updateButtons();
                }
            }, 500);
        } else {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
                updateProgressBar();
                updateButtons();
            } else {
                submitQuiz();
            }
        }
    }


    function showPrevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
            updateProgressBar();
            updateButtons();
        }
    }

    
    function submitQuiz() {
        quizCompleted = true;
        
        
        score = 0;
        selectedOptions.forEach((selectedIndex, questionIndex) => {
            if (selectedIndex !== null && 
                quizQuestions[questionIndex].options[selectedIndex] === 
                quizQuestions[questionIndex].answer) {
                score++;
            }
        });
        
        
        showResults();
    }

    
    function showResults() {
        
        const percentage = (score / quizQuestions.length) * 100;
        
        
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = quizQuestions.length;
        
        
        mercury.style.height = `${percentage}%`;
        
        
        if (percentage >= 80) {
            planetResult.innerHTML = '<i class="fas fa-smile-beam"></i>';
            planetResult.style.background = 'radial-gradient(circle at 30% 30%, #2ecc71, #27ae60)';
            planetResult.style.boxShadow = '0 0 30px rgba(46, 204, 113, 0.7)';
            resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            resultTitle.textContent = 'Climate Champion!';
        } else if (percentage >= 50) {
            planetResult.innerHTML = '<i class="fas fa-meh"></i>';
            planetResult.style.background = 'radial-gradient(circle at 30% 30%, #f39c12, #e67e22)';
            planetResult.style.boxShadow = '0 0 30px rgba(230, 126, 34, 0.7)';
            resultIcon.innerHTML = '<i class="fas fa-award"></i>';
            resultTitle.textContent = 'Good Effort!';
        } else {
            planetResult.innerHTML = '<i class="fas fa-frown-open"></i>';
            planetResult.style.background = 'radial-gradient(circle at 30% 30%, #e74c3c, #c0392b)';
            planetResult.style.boxShadow = '0 0 30px rgba(231, 76, 60, 0.7)';
            resultIcon.innerHTML = '<i class="fas fa-book"></i>';
            resultTitle.textContent = 'Keep Learning!';
        }
        
        
        resultFacts.innerHTML = '';
        const facts = getClimateFacts(percentage);
        facts.forEach(fact => {
            const factElement = document.createElement('p');
            factElement.innerHTML = `<i class="fas fa-leaf"></i> ${fact}`;
            resultFacts.appendChild(factElement);
        });
        
        
        document.querySelector('.quiz-body').style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.classList.add('animate__fadeIn');
        
    
        window.scrollTo(0, 0);
    }

    
    function getClimateFacts(percentage) {
        const facts = [
            "The last decade (2011-2020) was the warmest on record.",
            "Global sea level rose about 8 inches (20 cm) in the last century.",
            "The Arctic is warming twice as fast as the global average.",
            "Renewable energy could power the world by 2050 if we act now.",
            "Planting 1 trillion trees could capture 25% of atmospheric CO₂."
        ];
        
        const tips = [
            "Reduce meat consumption - it can cut your food carbon footprint by up to 50%.",
            "Flying less is one of the most impactful personal climate actions.",
            "Switch to renewable energy providers where available.",
            "Insulate your home to reduce heating/cooling needs.",
            "Support policies and companies that prioritize climate action."
        ];
        
        if (percentage >= 80) {
            return [
                "You're a climate expert! Consider sharing your knowledge with others.",
                ...tips
            ].slice(0, 3);
        } else if (percentage >= 50) {
            return [
                "You have good climate awareness! Here are ways to deepen your knowledge:",
                ...facts
            ].slice(0, 3);
        } else {
            return [
                "Climate change is complex. Here are key facts to get started:",
                ...facts
            ].slice(0, 3);
        }
    }
    function restartQuiz() {
        
        currentQuestionIndex = 0;
        score = 0;
        selectedOptions.fill(null);
        quizCompleted = false;
        showFeedback = false;
        
    
        scoreElement.textContent = '0';
        document.querySelector('.quiz-body').style.display = 'block';
        resultContainer.style.display = 'none';
        resultContainer.classList.remove('animate__fadeIn');
        
        
        initQuiz();
    }

    
    function shareResults() {
        const shareText = `I scored ${score}/${quizQuestions.length} on the Climate Change Quiz! Test your knowledge about our planet.`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Climate Change Quiz',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
        
        function fallbackShare() {
            
            navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
                alert('Results copied to clipboard! Paste to share.');
            }).catch(err => {
                console.log('Could not copy text: ', err);
                prompt('Copy this link to share:', window.location.href);
            });
        }
    }

    nextBtn.addEventListener('click', showNextQuestion);
    prevBtn.addEventListener('click', showPrevQuestion);
    continueBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    shareBtn.addEventListener('click', shareResults);

    
    initQuiz();
});