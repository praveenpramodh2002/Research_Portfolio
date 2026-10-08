/* ==========================================================================
   PURETALK INTERACTIVE JAVASCRIPT LOGIC
   SLIIT Research Project ID: R26-IT-008
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
     * 1. NAVBAR SCROLL EFFECT, MOBILE MENU & SCROLLSPY HIGHLIGHT
     * ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on nav link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ScrollSpy Active Nav Link Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
     * 2. CORE MODULES TABS SYSTEM
     * ---------------------------------------------------------------------- */
    const tabBtns = document.querySelectorAll('.modules-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const activePane = document.getElementById(`pane-${targetTab}`);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
     * 3. LIVE AI DEMO SANDBOX CONTROLLER
     * ---------------------------------------------------------------------- */
    // Demo Mode Switching (Text / Image / Audio / Profile)
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mode = tab.getAttribute('data-mode');

            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPanel = document.getElementById(`demo-${mode}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
     * 3A. TEXT & SINGLISH AI MODERATION SIMULATOR
     * ---------------------------------------------------------------------- */
    const textSampleSelect = document.getElementById('textSampleSelect');
    const demoTextInput = document.getElementById('demoTextInput');
    const btnAnalyzeText = document.getElementById('btnAnalyzeText');

    // Preset Data Store
    const presets = {
        preset1: {
            text: "Mokauda me pal hora, thota monawada puluwan",
            toxic: 78.4,
            severe: 12.0,
            obscene: 42.1,
            threat: 5.2,
            insult: 84.2,
            identity: 3.1,
            action: "HIDE CONTENT",
            actionType: "hide",
            desc: "AESM Action: HIDE POST. High Insult & Toxic score detected in Singlish. Content masked for sensitive readers.",
            tokens: [
                { word: "Mokauda", toxic: false },
                { word: "me", toxic: false },
                { word: "pal hora", toxic: true },
                { word: "thota", toxic: true },
                { word: "monawada", toxic: false },
                { word: "puluwan", toxic: false }
            ]
        },
        preset2: {
            text: "Umbala okkotama gahala maranawa balapan",
            toxic: 91.2,
            severe: 88.5,
            obscene: 30.2,
            threat: 94.6,
            insult: 62.1,
            identity: 18.4,
            action: "ESC-VICTIM-SUPPORT",
            actionType: "support",
            desc: "AESM Action: DISTRESS ROUTE. Severe Threat detected in Singlish. Content blocked & routed to human support team.",
            tokens: [
                { word: "Umbala", toxic: false },
                { word: "okkotama", toxic: false },
                { word: "gahala", toxic: true },
                { word: "maranawa", toxic: true },
                { word: "balapan", toxic: false }
            ]
        },
        preset3: {
            text: "You are completely useless, go away and shut up!",
            toxic: 82.5,
            severe: 24.1,
            obscene: 15.2,
            threat: 8.4,
            insult: 89.1,
            identity: 4.1,
            action: "WARN & BLUR",
            actionType: "blur",
            desc: "AESM Action: BLUR & WARN. Explicit Insult in English text. Blurred overlay with warning button applied.",
            tokens: [
                { word: "You", toxic: false },
                { word: "are", toxic: false },
                { word: "completely", toxic: false },
                { word: "useless", toxic: true },
                { word: "go away", toxic: false },
                { word: "and", toxic: false },
                { word: "shut up!", toxic: true }
            ]
        },
        preset4: {
            text: "Subha aluth awuruddak wewa yaluwane! Great research work!",
            toxic: 1.2,
            severe: 0.2,
            obscene: 0.5,
            threat: 0.1,
            insult: 0.8,
            identity: 0.1,
            action: "ALLOW POST",
            actionType: "allow",
            desc: "AESM Action: ALLOW POST. Content passes all safety checks with 98.8% confidence.",
            tokens: [
                { word: "Subha", toxic: false },
                { word: "aluth", toxic: false },
                { word: "awuruddak", toxic: false },
                { word: "wewa", toxic: false },
                { word: "yaluwane!", toxic: false },
                { word: "Great", toxic: false },
                { word: "research", toxic: false },
                { word: "work!", toxic: false }
            ]
        }
    };

    // Load initial preset
    if (textSampleSelect && demoTextInput) {
        demoTextInput.value = presets.preset1.text;

        textSampleSelect.addEventListener('change', () => {
            const val = textSampleSelect.value;
            if (val !== 'custom' && presets[val]) {
                demoTextInput.value = presets[val].text;
                updateTextAnalysisUI(presets[val]);
            }
        });

        btnAnalyzeText.addEventListener('click', () => {
            const val = textSampleSelect.value;
            if (val !== 'custom' && presets[val]) {
                updateTextAnalysisUI(presets[val]);
            } else {
                // Compute custom text heuristics
                const userText = demoTextInput.value.trim().toLowerCase();
                const isToxic = /hora|maranawa|ballo|useless|stupid|shut up|gahala|keriya|pissuda/.test(userText);
                
                const customData = {
                    text: demoTextInput.value,
                    toxic: isToxic ? 75.0 : 4.5,
                    severe: isToxic ? 35.0 : 0.8,
                    obscene: isToxic ? 45.0 : 1.2,
                    threat: /maranawa|gahala|kill/.test(userText) ? 88.0 : 1.0,
                    insult: isToxic ? 82.0 : 3.2,
                    identity: 2.0,
                    action: isToxic ? "WARN & BLUR" : "ALLOW POST",
                    actionType: isToxic ? "blur" : "allow",
                    desc: isToxic ? "AESM Action: BLUR & WARN. Custom toxic keywords detected." : "AESM Action: ALLOW POST. No toxicity detected in custom text.",
                    tokens: userText.split(' ').map(w => ({
                        word: w,
                        toxic: /hora|maranawa|ballo|useless|stupid|shut|gahala|keriya|pissuda/.test(w)
                    }))
                };
                updateTextAnalysisUI(customData);
            }
        });
    }

    function updateTextAnalysisUI(data) {
        // Update Bars
        setBarValue('valToxic', 'barToxic', data.toxic);
        setBarValue('valSevere', 'barSevere', data.severe);
        setBarValue('valObscene', 'barObscene', data.obscene);
        setBarValue('valThreat', 'barThreat', data.threat);
        setBarValue('valInsult', 'barInsult', data.insult);
        setBarValue('valIdentity', 'barIdentity', data.identity);

        // Overall Toxicity Badge
        const overallBadge = document.getElementById('overallToxicityBadge');
        if (data.toxic > 50 || data.insult > 50 || data.threat > 50) {
            overallBadge.textContent = "TOXIC CONTENT DETECTED";
            overallBadge.className = "badge badge-danger";
        } else {
            overallBadge.textContent = "CLEAN CONTENT";
            overallBadge.className = "badge badge-safe";
        }

        // AESM Action Banner
        const aesmBanner = document.getElementById('aesmActionBox');
        const aesmTitle = document.getElementById('aesmActionTitle');
        const aesmDesc = document.getElementById('aesmActionDesc');

        if (aesmBanner && aesmTitle && aesmDesc) {
            aesmBanner.className = `aesm-action-banner ${data.actionType}`;
            aesmTitle.textContent = `AESM Action: ${data.action}`;
            aesmDesc.textContent = data.desc;
        }

        // LIME Tokens
        const limeTokensContainer = document.getElementById('limeTokens');
        if (limeTokensContainer) {
            limeTokensContainer.innerHTML = '';
            data.tokens.forEach(t => {
                const span = document.createElement('span');
                span.className = `token ${t.toxic ? 'token-toxic' : 'token-clean'}`;
                span.textContent = t.word;
                limeTokensContainer.appendChild(span);
            });
        }
    }

    function setBarValue(valId, barId, percent) {
        const valElem = document.getElementById(valId);
        const barElem = document.getElementById(barId);
        if (valElem && barElem) {
            valElem.textContent = `${percent.toFixed(1)}%`;
            barElem.style.width = `${percent}%`;
        }
    }

    /* ----------------------------------------------------------------------
     * 3B. IMAGE PRE-UPLOAD SCAN SIMULATOR
     * ---------------------------------------------------------------------- */
    const imgPresetCards = document.querySelectorAll('.img-preset-card');
    const btnAnalyzeImage = document.getElementById('btnAnalyzeImage');
    const imgPreviewBox = document.getElementById('imgPreviewBox');
    const imgToxicityScore = document.getElementById('imgToxicityScore');
    const imgUploadDecision = document.getElementById('imgUploadDecision');

    let currentImgPreset = 'safe';

    imgPresetCards.forEach(card => {
        card.addEventListener('click', () => {
            imgPresetCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentImgPreset = card.getAttribute('data-img');
        });
    });

    if (btnAnalyzeImage) {
        btnAnalyzeImage.addEventListener('click', () => {
            if (currentImgPreset === 'safe') {
                imgPreviewBox.innerHTML = `<img src="images/images1.png" alt="Safe Image" style="max-height: 140px; border-radius: 8px; margin-bottom: 0.5rem;"><span class="text-emerald font-semibold"><i class="fa-solid fa-circle-check"></i> Safe Educational Graphic (RGB 224x224)</span>`;
                imgToxicityScore.textContent = "12.4% (Safe)";
                imgToxicityScore.className = "text-emerald";
                imgUploadDecision.textContent = "APPROVED FOR UPLOAD";
                imgUploadDecision.className = "badge badge-safe";
            } else if (currentImgPreset === 'meme') {
                imgPreviewBox.innerHTML = `<img src="images/images2.jpg" alt="Meme Image" style="max-height: 140px; border-radius: 8px; margin-bottom: 0.5rem;"><span class="text-amber font-semibold"><i class="fa-solid fa-triangle-exclamation"></i> Cyberbullying Meme Detected</span>`;
                imgToxicityScore.textContent = "79.8% (Toxic Meme)";
                imgToxicityScore.className = "text-rose";
                imgUploadDecision.textContent = "BLOCKED PRE-UPLOAD (THRESHOLD 0.5 EXCEEDED)";
                imgUploadDecision.className = "badge badge-danger";
            } else if (currentImgPreset === 'hate') {
                imgPreviewBox.innerHTML = `<img src="images/images3.jpg" alt="Hate Screenshot" style="max-height: 140px; border-radius: 8px; margin-bottom: 0.5rem;"><span class="text-rose font-semibold"><i class="fa-solid fa-shield-virus"></i> Hate Speech Screenshot Detected</span>`;
                imgToxicityScore.textContent = "94.2% (Severe Toxic Image)";
                imgToxicityScore.className = "text-rose";
                imgUploadDecision.textContent = "BLOCKED PRE-UPLOAD & LOGGED IN DB";
                imgUploadDecision.className = "badge badge-danger";
            }
        });
    }

    /* ----------------------------------------------------------------------
     * 3C. AUDIO SPEECH & EMOTION FUSION SIMULATOR
     * ---------------------------------------------------------------------- */
    const audioSampleCards = document.querySelectorAll('.audio-sample-card');
    const btnAnalyzeAudio = document.getElementById('btnAnalyzeAudio');
    let currentAudioType = 'calm';

    audioSampleCards.forEach(card => {
        card.addEventListener('click', () => {
            audioSampleCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentAudioType = card.getAttribute('data-audio');
        });
    });

    if (btnAnalyzeAudio) {
        btnAnalyzeAudio.addEventListener('click', () => {
            const transcript = document.getElementById('audioTranscriptText');
            const textScore = document.getElementById('audioTextScore');
            const emotionTag = document.getElementById('vocalEmotionTag');
            const finalScore = document.getElementById('fusedFinalScore');

            if (currentAudioType === 'calm') {
                transcript.textContent = '"Thank you for submitting your research paper."';
                textScore.textContent = "2.1%";
                emotionTag.textContent = "Neutral / Calm";
                emotionTag.className = "badge badge-safe";
                finalScore.textContent = "2.1% (Allowed)";
                finalScore.className = "text-cyan";
            } else {
                transcript.textContent = '"Mokauda yakathiyaganne ballo, thota maranawa!"';
                textScore.textContent = "86.5%";
                emotionTag.textContent = "Vocal Anger / Aggression (+12% Fusion Evidence)";
                emotionTag.className = "badge badge-danger";
                finalScore.textContent = "98.5% (High Risk - Blocked)";
                finalScore.className = "text-rose";
            }
        });
    }

    /* ----------------------------------------------------------------------
     * 3D. USER PROFILE & SHAP XAI SIMULATOR
     * ---------------------------------------------------------------------- */
    const tierBtns = document.querySelectorAll('.tier-btn');

    tierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tierBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tier = btn.getAttribute('data-tier');
            updateSHAPProfile(tier);
        });
    });

    function updateSHAPProfile(tier) {
        const riskBadge = document.getElementById('riskTierBadge');
        const sanctionText = document.getElementById('sanctionText');
        const sanctionBox = document.getElementById('sanctionBox');

        const shapVal1 = document.getElementById('shapVal1');
        const shapBar1 = document.getElementById('shapBar1');
        const shapVal2 = document.getElementById('shapVal2');
        const shapBar2 = document.getElementById('shapBar2');
        const shapVal3 = document.getElementById('shapVal3');
        const shapBar3 = document.getElementById('shapBar3');
        const shapVal4 = document.getElementById('shapVal4');
        const shapBar4 = document.getElementById('shapBar4');

        if (tier === '0') {
            riskBadge.textContent = "LOW RISK (TIER 0)";
            riskBadge.className = "badge badge-safe";
            sanctionText.textContent = "Applied Sanction: None (Full Posting Privileges)";
            sanctionBox.className = "sanction-banner mt-3 p-3 radius-md bg-dark-subtle";

            shapVal1.textContent = "+0.02"; shapBar1.style.width = "5%"; shapBar1.className = "bar-fill bg-emerald";
            shapVal2.textContent = "+0.04"; shapBar2.style.width = "8%"; shapBar2.className = "bar-fill bg-emerald";
            shapVal3.textContent = "+0.01"; shapBar3.style.width = "3%"; shapBar3.className = "bar-fill bg-emerald";
            shapVal4.textContent = "+0.01"; shapBar4.style.width = "2%"; shapBar4.className = "bar-fill bg-emerald";
        } else if (tier === '1') {
            riskBadge.textContent = "MEDIUM RISK (TIER 1)";
            riskBadge.className = "badge badge-warning";
            sanctionText.textContent = "Applied Sanction: Warning Banner & Mandatory AI Detox Paraphrasing";
            sanctionBox.className = "sanction-banner mt-3 p-3 radius-md bg-warning-subtle";

            shapVal1.textContent = "+0.35"; shapBar1.style.width = "35%"; shapBar1.className = "bar-fill bg-amber";
            shapVal2.textContent = "+0.42"; shapBar2.style.width = "42%"; shapBar2.className = "bar-fill bg-amber";
            shapVal3.textContent = "+0.18"; shapBar3.style.width = "18%"; shapBar3.className = "bar-fill bg-amber";
            shapVal4.textContent = "+0.25"; shapBar4.style.width = "25%"; shapBar4.className = "bar-fill bg-amber";
        } else if (tier === '2') {
            riskBadge.textContent = "HIGH RISK (TIER 2)";
            riskBadge.className = "badge badge-danger";
            sanctionText.textContent = "Applied Sanction: 24-Hour Account Mute & Post Pre-Approval Queue";
            sanctionBox.className = "sanction-banner mt-3 p-3 radius-md bg-danger-subtle";

            shapVal1.textContent = "+0.68"; shapBar1.style.width = "68%"; shapBar1.className = "bar-fill bg-rose";
            shapVal2.textContent = "+0.74"; shapBar2.style.width = "74%"; shapBar2.className = "bar-fill bg-rose";
            shapVal3.textContent = "+0.55"; shapBar3.style.width = "55%"; shapBar3.className = "bar-fill bg-rose";
            shapVal4.textContent = "+0.60"; shapBar4.style.width = "60%"; shapBar4.className = "bar-fill bg-rose";
        } else if (tier === '3') {
            riskBadge.textContent = "CRITICAL REPEAT OFFENDER (TIER 3)";
            riskBadge.className = "badge badge-danger";
            sanctionText.textContent = "Applied Sanction: Permanent Platform Suspension (Ban) & Admin Review";
            sanctionBox.className = "sanction-banner mt-3 p-3 radius-md bg-danger-subtle";

            shapVal1.textContent = "+0.94"; shapBar1.style.width = "94%"; shapBar1.className = "bar-fill bg-rose";
            shapVal2.textContent = "+0.98"; shapBar2.style.width = "98%"; shapBar2.className = "bar-fill bg-rose";
            shapVal3.textContent = "+0.88"; shapBar3.style.width = "88%"; shapBar3.className = "bar-fill bg-rose";
            shapVal4.textContent = "+0.92"; shapBar4.style.width = "92%"; shapBar4.className = "bar-fill bg-rose";
        }
    }

    /* ----------------------------------------------------------------------
     * 4. DOCUMENT REPOSITORY FILTER, SEARCH & MODAL PREVIEW
     * ---------------------------------------------------------------------- */
    const docFilterBtns = document.querySelectorAll('.doc-filter-btn');
    const docGridItems = document.querySelectorAll('#docGrid .doc-box');
    const docSearchInput = document.getElementById('docSearchInput');

    // Category Filter
    docFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            docFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filterDocuments(filter, docSearchInput ? docSearchInput.value : '');
        });
    });

    // Search Filter
    if (docSearchInput) {
        docSearchInput.addEventListener('input', () => {
            const activeFilter = document.querySelector('.doc-filter-btn.active')?.getAttribute('data-filter') || 'all';
            filterDocuments(activeFilter, docSearchInput.value);
        });
    }

    function filterDocuments(category, query) {
        const q = query.trim().toLowerCase();

        docGridItems.forEach(item => {
            const itemCat = item.getAttribute('data-category');
            const itemTitle = (item.getAttribute('data-title') || '').toLowerCase();
            const itemAuthor = (item.getAttribute('data-author') || '').toLowerCase();
            const itemText = item.textContent.toLowerCase();

            const matchCategory = (category === 'all' || itemCat === category);
            const matchQuery = (!q || itemTitle.includes(q) || itemAuthor.includes(q) || itemText.includes(q));

            if (matchCategory && matchQuery) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Modal Preview Handler
    const docModal = document.getElementById('docModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const btnPreviewDocs = document.querySelectorAll('.btn-preview-doc');

    const docPreviews = {
        'common-report': {
            title: "Common Integrated Solution Report (Project ID: R26-IT-008)",
            meta: "Format: PDF • Size: 14.2 MB • Oct 2026",
            desc: "This comprehensive 60+ page report documents PureTalk, an integrated AI-supported moderation platform built on Django REST Framework. It covers all four components: BiLSTM Singlish text detection, speech emotion fusion, MobileNetV2 pre-upload image check, AESM 5-action protective shielding, and Random Forest risk modeling with SHAP/LIME XAI."
        },
        'slides': {
            title: "Final Defense Presentation Slide Deck",
            meta: "Format: PPTX / PDF • Size: 28.5 MB • Oct 2026",
            desc: "Slide presentation deck presented to the SLIIT Faculty of Computing defense panel. Includes system architecture diagrams, performance benchmark tables (86% - 99.2% accuracy), live sandbox demonstration clips, and UN SDG alignment overview."
        },
        'taf': {
            title: "Topic Assessment Form (TAF) & Project Proposal",
            meta: "Format: PDF • Size: 3.8 MB • Feb 2026",
            desc: "SLIIT IT4010 approved research scope document detailing problem formulation, literature review synthesis, supervisor signatures (Ms. Manori Gamage & Mr. Nelum Amarasena), and individual student component ownership."
        },
        'thesis-c1': {
            title: "Multimodal Text Toxicity Detection Thesis (Tharindi W.A.K)",
            meta: "Format: PDF • Size: 12.4 MB • Student ID: IT22116260",
            desc: "Individual thesis publication introducing the BiLSTM multi-label classifier extended by a Singlish slur-normalization lexicon, ASR speech emotion fusion, and video frame OCR text extraction."
        },
        'thesis-c2': {
            title: "Toxicity Image Detection Thesis (Perera M D S)",
            meta: "Format: PDF • Size: 15.8 MB • Student ID: IT22245892",
            desc: "Individual thesis publication detailing pre-upload toxic image blocking using MobileNetV2 CNN transfer learning, 224x224 RGB normalization, 0.5 decision threshold, and Keras H5 fallback redundancy."
        },
        'thesis-c3': {
            title: "Adaptive Emotional Shielding Module Thesis (Praveen H.G)",
            meta: "Format: PDF • Size: 11.2 MB • Student ID: IT22252968",
            desc: "Individual thesis publication detailing the BiLSTM-attention classifier (96.8% Acc), 5-level protective UI action selection (Allow, Warn, Blur, Hide, Rewrite), and victim distress human escalation."
        },
        'thesis-c4': {
            title: "Profile-Based Toxic Behavior & XAI Thesis (Manohara H.U.K.R.T)",
            meta: "Format: PDF • Size: 13.6 MB • Student ID: IT22169594",
            desc: "Individual thesis publication detailing the Random Forest behavioral risk model (99.2% Acc), SHAP force plot feature attributions, Social Network Analysis centrality metrics, and graduated sanctions hierarchy."
        },
        'logbook': {
            title: "Group Research Supervision Logbook",
            meta: "Format: PDF • Size: 4.1 MB • Oct 2026",
            desc: "Verified SLIIT research logbook recording weekly supervisor consultation minutes, milestone progress reviews, code audit logs, and team contribution signatures."
        }
    };

    btnPreviewDocs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const docKey = btn.getAttribute('data-doc');
            const data = docPreviews[docKey];

            if (data && docModal) {
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalMeta').textContent = data.meta;
                document.getElementById('modalDesc').textContent = data.desc;
                docModal.classList.add('active');
            }
        });
    });

    if (modalCloseBtn && docModal) {
        modalCloseBtn.addEventListener('click', () => {
            docModal.classList.remove('active');
        });

        docModal.addEventListener('click', (e) => {
            if (e.target === docModal) {
                docModal.classList.remove('active');
            }
        });
    }

});
