export const supportedLocales = ["en", "es", "pt"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";

const translations = {
  en: {
    // Nav
    newProject: "New Project",

    // Home
    projects: "Projects",
    manageProjects: "Manage your video subtitle projects",
    loadingProjects: "Loading projects…",
    noProjectsYet: "No projects yet",
    noProjectsDesc: "Create your first project to start generating subtitles",
    createProject: "Create Project",
    noVideoUploaded: "No video uploaded",
    deleteConfirm: "Delete this project and all its data?",
    cancel: "Cancel",

    // New project
    backToProjects: "Back to projects",
    newProjectTitle: "New Project",
    newProjectDesc: "Upload a video and choose how to generate subtitles",
    videoLabel: "Video",
    dropVideo: "Drop your video here or",
    browse: "browse",
    supportedFormats: "Supports MP4, WebM · Max 500 MB",
    clickToChange: "Click to change",
    titleLabel: "Title",
    titlePlaceholder: "My Tutorial Video",
    templateLabel: "Template",
    tutorialLabel: "How-To Tutorial",
    tutorialDesc: "Guide your audience through a process, step by step",
    productDemoLabel: "Product Demo",
    productDemoDesc: "Showcase your product's best features with impact",
    invalidFileType: "Invalid file type. Use MP4 or WebM.",
    fileTooLarge: "File too large. Maximum size is 500 MB.",
    creatingProject: "Creating project…",
    uploadingVideo: "Uploading video…",
    done: "Done!",
    failedCreate: "Failed to create project",
    failedUpload: "Failed to upload video",
    somethingWrong: "Something went wrong",
    createAndUpload: "Create Project & Upload",

    // Project detail
    deleteProject: "Delete",
    deleteProjectConfirm: "Delete this project?",
    loadingProject: "Loading project…",
    projectNotFound: "Project not found",
    noVideoYet: "No video uploaded yet",
    uploadToStart: "Upload a video to get started",
    subtitles: "Subtitles",
    segments: "segments",
    noSubtitlesYet: "No subtitles yet",
    noSubtitlesDesc: "Next step: extract frames and generate subtitles with AI",

    // Frame extraction
    extractFrames: "Extract Frames",
    extractingFrames: "Extracting frames…",
    extractedFrames: "Extracted Frames",
    framesCount: "frames",
    framesDesc: "Frames extracted every 2 seconds from the video",
    noFramesYet: "No frames extracted yet",
    noFramesDesc:
      "Extract frames from the video to prepare for subtitle generation",
    extractionFailed: "Frame extraction failed",
    frameAt: "Frame at",

    // Subtitle generation
    generateSubtitles: "Generate Subtitles",
    generatingSubtitles: "Analyzing frames with AI…",
    generateSubtitlesDesc:
      "Use AI to analyze the extracted frames and generate subtitles",
    generationFailed: "Subtitle generation failed",
    regenerateSubtitles: "Regenerate",

    // Subtitle editing
    editSubtitle: "Click to edit",
    saveSubtitle: "Save",
    subtitleUpdated: "Subtitle updated",
    subtitleUpdateFailed: "Failed to update subtitle",
    clickToSeek: "Click to jump to this point",

    // Screen recorder
    uploadFileTab: "Upload file",
    recordScreenTab: "Record screen",
    startRecording: "Start Recording",
    stopRecording: "Stop",
    pauseRecording: "Pause",
    resumeRecording: "Resume",
    cancelRecording: "Cancel",
    startCapture: "Start",
    recordingStatus: "Recording",
    pausedStatus: "Paused",
    recordAgain: "Record again",
    recordScreenDesc: "Record your screen directly from the browser",
    screenRecordingNotSupported:
      "Screen recording is not supported in this browser",
    screenRecordingTitle: "Screen Recording",

    // Timeline
    timeline: "Timeline",
    snapToGrid: "Snap to grid (0.5s)",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    subtitleOverlap: "Overlapping subtitles",
    timelineDragError: "Failed to update subtitle timing",
    // Timeline advanced
    undo: "Undo",
    redo: "Redo",
    splitAtPlayhead: "Split at playhead",
    deleteSelected: "Delete selected",
    captionsTrack: "Captions",
    videoTrack: "Video",
    addMarker: "Add marker",
    deleteMarker: "Delete marker",
    markerColor: "Marker color",
    markerShape: "Marker shape",
    trimVideo: "Trim video",
    deleteSection: "Delete section",
    playPause: "Play / Pause",
    skipBack: "Back 5s",
    skipForward: "Forward 5s",
    saveChanges: "Save",
    nothingSelected: "Nothing selected",
    deleteSubtitleConfirm: "Delete this subtitle?",
    deleteSectionConfirm: "Delete this video section?",
    changesSaved: "Changes saved",
    trackVisible: "Track visible",
    trackHidden: "Track hidden",
    subtitleDeleted: "Subtitle deleted",
    sectionDeleted: "Section deleted",
    markerAdded: "Marker added",

    // Subtitle Style
    subtitleStyle: "Subtitle Style",
    fontFamily: "Font",
    fontSize: "Size",
    textColor: "Text Color",
    background: "Background",
    opacity: "Opacity",
    subtitleAnimation: "Animation",
    previewText: "Preview subtitle text",
    saveStyle: "Save Style",
    saving: "Saving…",

    // Processing screen
    processingUpload: "Uploading video",
    processingUploadDesc: "Transferring your video securely",
    processingExtract: "Extracting frames",
    processingExtractDesc: "Capturing key moments from your video",
    processingAnalyze: "Analyzing video",
    processingAnalyzeDesc: "AI is reviewing your video content",
    processingGenerate: "Generating subtitles",
    processingGenerateDesc: "Creating time-aligned subtitles with AI",
    processingCompleted: "Completed",
    processingInProgress: "In Progress",
    processingError: "Error",
    processingAnalyzed: "analyzed",
    processingVideoSubtitle: "Showguide is analyzing your video content...",
    processingStepOf: "Step {current} of {total}",
    processingFailed: "Processing failed. Please try again.",
    retryProcessing: "Retry",
    processingLongVideoHint:
      "Longer videos can take a bit more time to analyze and subtitle.",
    processingStayHere:
      "You can stay on this screen. We'll open the editor automatically when everything is ready.",
    processingStillWorking: "Still working in the background",
    processingElapsed: "Elapsed",
    notifyWhenDone: "Notify me when done",
    notificationsBlocked:
      "Notifications blocked. Enable them in your browser settings.",
    notificationSubtitlesReady: "Your subtitles are ready!",
    notificationsDenied: "Notification permission denied",
    subtitleSaved: "Subtitle saved",
    styleSaved: "Style saved",

    // Export
    exportVideo: "Export Video",
    exportingVideo: "Exporting video…",
    exportDesc: "Burn subtitles into the video and download the result",
    exportFailed: "Export failed",
    exportComplete: "Export complete!",
    downloadVideo: "Download Video",
    reExport: "Re-export",
    qualityLabel: "Quality",
    quality1080: "1080p — Full HD",
    quality720: "720p — HD",
    quality480: "480p — SD",
    qualityBest: "Best quality",
    qualityBalanced: "Balanced",
    qualitySmallFile: "Smaller file",

    // Nav links (landing)
    navHowItWorks: "How It Works",
    navFeatures: "Features",
    navFaq: "FAQ",

    // Landing
    heroTitle: "AI-Powered Subtitles for Your Videos",
    heroSubtitle:
      "Upload your video, let AI analyze every frame, and get perfectly timed subtitles in seconds. No transcription needed — our vision AI understands what's happening on screen.",
    heroCta: "Start Creating",
    heroSecondaryCta: "See How It Works",
    heroTag: "Powered by AI Vision",

    howItWorksLabel: "How It Works",
    howItWorksTitle: "Three Steps to Perfect Subtitles",
    howItWorksSubtitle:
      "From raw video to polished subtitles in minutes, not hours.",
    step1Title: "Upload Your Video",
    step1Desc:
      "Drop your screen recording, tutorial, or product demo — or record your screen directly from the browser. We support MP4 and WebM files.",
    step2Title: "AI Analyzes Every Frame",
    step2Desc:
      "Our AI extracts key frames and visually analyzes what's happening — UI interactions, transitions, text on screen — to generate context-aware subtitles.",
    step3Title: "Export & Share",
    step3Desc:
      "Review, edit if needed, and export your video with burned-in subtitles. Ready for social media, docs, or your website.",

    featuresLabel: "Features",
    featuresTitle: "Everything You Need",
    featuresSubtitle:
      "Built for creators who want professional subtitles without the manual work.",
    feature1Title: "Vision AI, Not Audio",
    feature1Desc:
      "Unlike traditional tools, we analyze what's visible on screen — perfect for silent screen recordings and tutorials.",
    feature2Title: "Smart Templates",
    feature2Desc:
      "Choose between tutorial and product demo styles. The AI adapts its tone, pacing, and language to match your content type.",
    feature3Title: "Multi-Language",
    feature3Desc:
      "Generate subtitles in English, Spanish, or Portuguese. The AI writes natively in your chosen language, not machine-translated.",
    feature4Title: "Time-Aligned",
    feature4Desc:
      "Every subtitle is precisely synced to the video timeline. No manual timing adjustments needed.",
    feature5Title: "Edit & Refine",
    feature5Desc:
      "Full editing control over every subtitle. Adjust text, timing, and style before exporting.",
    feature6Title: "One-Click Export",
    feature6Desc:
      "Export your video with subtitles burned in. No external tools or complex workflows required.",

    pricingLabel: "Pricing",
    pricingTitle: "Plans That Fit From First Test to Full Team",
    pricingSubtitle:
      "Start with a USD 0.99 trial, move to a solo workflow, or roll Showguide out across your production team.",
    pricingPerMonth: "per month",
    pricingFeatured: "Most popular",
    pricingPlanTrialName: "Trial",
    pricingPlanTrialDesc:
      "A low-friction way to validate your subtitle workflow before you scale it.",
    pricingPlanTrialBadge: "USD 1 entry",
    pricingPlanTrialCta: "Start Trial",
    pricingPlanTrialFeature1: "Access the complete subtitle editor",
    pricingPlanTrialFeature2: "Create and export your first guided video",
    pricingPlanTrialFeature3: "Test AI subtitles with real projects",
    pricingPlanTrialFeature4: "Upgrade any time without migrating work",
    pricingPlanPlusName: "Plus",
    pricingPlanPlusDesc:
      "For solo creators publishing polished tutorials and product walkthroughs every week.",
    pricingPlanPlusBadge: "Solo creator",
    pricingPlanPlusCta: "Choose Plus",
    pricingPlanPlusFeature1: "Faster weekly content pipeline",
    pricingPlanPlusFeature2: "Reusable subtitle style presets",
    pricingPlanPlusFeature3: "Exports ready for social and docs",
    pricingPlanPlusFeature4: "Built for one-person production",
    pricingPlanTeamsName: "Teams",
    pricingPlanTeamsDesc:
      "For small teams that need shared production standards and cleaner handoff between roles.",
    pricingPlanTeamsBadge: "Collaboration ready",
    pricingPlanTeamsCta: "Choose Teams",
    pricingPlanTeamsFeature1: "Shared workflow across creators and PMs",
    pricingPlanTeamsFeature2: "Consistent brand-ready subtitle output",
    pricingPlanTeamsFeature3: "Cleaner review and delivery handoff",
    pricingPlanTeamsFeature4: "Best fit for growing content teams",
    pricingPlanProName: "Pro",
    pricingPlanProDesc:
      "For high-volume operations that need priority throughput, advanced workflows, and premium support.",
    pricingPlanProBadge: "Scale plan",
    pricingPlanProCta: "Contact Sales",
    pricingPlanProFeature1: "Priority rendering and exports",
    pricingPlanProFeature2: "Advanced voice workflow support",
    pricingPlanProFeature3: "Operational support for busy teams",
    pricingPlanProFeature4: "Designed for serious publishing volume",

    whoLabel: "Who Is It For",
    whoTitle: "Built for Creators Like You",
    whoSubtitle:
      "Whether you're building tutorials, demos, or training content — Showguide saves you hours.",
    who1Title: "Content Creators",
    who1Desc:
      "Create engaging tutorials with professional subtitles that keep viewers watching.",
    who2Title: "Product Teams",
    who2Desc:
      "Build polished product demos and onboarding videos that speak for themselves.",
    who3Title: "Educators & Trainers",
    who3Desc:
      "Make training content accessible and easy to follow with clear, step-by-step subtitles.",
    who4Title: "Marketing Teams",
    who4Desc:
      "Produce social media videos and promotional content with captions that drive engagement.",

    faqLabel: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Got questions? We've got answers.",
    faq1Q: "How does Showguide generate subtitles without audio?",
    faq1A:
      "Showguide analyzes what's happening visually in your video — screen interactions, transitions, text on screen — and writes subtitles that describe each step. No microphone or audio track needed.",
    faq2Q: "What video formats are supported?",
    faq2A:
      "We support MP4 and WebM files. You can also record your screen directly from the browser.",
    faq3Q: "Can I edit the generated subtitles?",
    faq3A:
      "Yes! After generation, you can review and edit every subtitle — text, timing, and style — before exporting your final video.",
    faq4Q: "What languages are supported?",
    faq4A:
      "Currently English, Spanish, and Portuguese. Subtitles are written natively in your chosen language, not machine-translated.",
    faq5Q: "Is my video data secure?",
    faq5A:
      "Your videos stay on your infrastructure. Only the necessary frames are analyzed to generate subtitles, and nothing is stored externally.",

    ctaTitle: "Ready to Add Subtitles to Your Videos?",
    ctaSubtitle:
      "Start creating professional, AI-generated subtitles in minutes.",
    ctaCta: "Get Started Free",

    footerTagline: "AI-powered subtitles for the modern creator.",
    footerProduct: "Product",
    footerResources: "Resources",
    footerLegal: "Legal",
    footerDashboard: "Dashboard",
    footerPricing: "Pricing",
    footerChangelog: "Changelog",
    footerDocs: "Documentation",
    footerSupport: "Support",
    footerBlog: "Blog",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",

    dashboard: "Dashboard",
    settings: "Settings",
    exports: "Exports",
    usage: "Usage",
    createNewProject: "Create New Project",
    newVideoProject: "New Video Project",
    newVideoProjectDesc:
      "Upload a video or record your screen and let Showguide generate subtitles automatically",
    uploadVideo: "Upload Video",
    recordScreen: "Record Screen",

    // Exports page
    exportsDesc: "View and download your exported videos",
    noExportsYet: "No exports yet",
    noExportsDesc: "Your exported videos will appear here",

    // Usage page
    usageDesc: "Monitor your AI credits and video processing usage",
    aiCredits: "AI Credits",
    videoMinutes: "Video Minutes",
    exportsUsage: "Exports",

    // Settings page
    settingsDesc: "Manage your account and preferences",
    profile: "Profile",
    preferences: "Preferences",
    preferencesDesc: "Language and theme settings are available in the sidebar",

    // Language & Voice (new project)
    languageLabel: "Subtitle Language",
    languageEn: "English",
    languageEs: "Spanish",
    languagePt: "Portuguese",
    subtitleToneLabel: "Subtitle Tone",
    subtitleToneHelper:
      "Refines how subtitles are written without changing the video type prompt.",
    subtitleToneNeutralLabel: "Neutral",
    subtitleToneNeutralDesc:
      "Balanced default. Clear and adaptable without sounding too stiff or too casual.",
    subtitleToneFormalLabel: "Formal",
    subtitleToneFormalDesc:
      "More professional and precise wording while preserving the selected template.",
    subtitleToneCasualLabel: "Casual",
    subtitleToneCasualDesc:
      "Closer and lighter phrasing while keeping the same tutorial or demo structure.",
    voiceToggleLabel: "Enable AI Voice",
    voiceToggleDesc: "Generate a narrated audio track from your subtitles",
    selectVoice: "Select a voice",
    voiceNotAvailable: "AI Voice is not available at the moment",
    loadingVoices: "Loading voices…",
    previewVoice: "Preview",
    voiceIncompatibleWarning: "This voice may not sound natural in the selected language",
    noVoicesForLanguage: "No voices optimized for this language. Showing all available voices.",
    language: "Language",
    narrationPanelTitle: "Narration Layer",
    narrationPanelDesc:
      "The editor keeps this narration track updated automatically and lets you review it with transcript playback.",
    narrationStatusIdle: "Not generated",
    narrationStatusProcessing: "Generating",
    narrationStatusCompleted: "Ready",
    narrationStatusFailed: "Failed",
    narrationStatusStale: "Outdated",
    narrationStatusLoadFailed: "Could not refresh narration status",
    narrationReady: "Narration is ready",
    narrationReadyLabel: "Narration ready for playback",
    narrationPendingLabel: "Narration will become available automatically",
    narrationVoiceMissing:
      "This project does not have an AI voice configured from creation.",
    narrationNeedsSubtitles:
      "Generate subtitles first to create the narration track.",
    generateNarration: "Generate narration",
    regenerateNarration: "Regenerate narration",
    generatingNarration: "Generating narration...",
    narrationGenerationStarted: "Narration generation started",
    narrationGenerationFailed: "Narration generation failed",
    playNarration: "Play narration",
    pauseNarration: "Pause narration",
    narrationSeek: "Seek narration",
    narrationPlaybackFailed: "Could not play the narration audio",
    narrationGeneratedAt: "Generated at",
    narrationTrack: "Narration",
    muteNarration: "Mute narration",
    unmuteNarration: "Unmute narration",
    narrationAutoMode: "Auto",
    narrationMutedBadge: "Muted",
    narrationTrackDisabled: "AI voice not enabled",
    narrationAutoPending:
      "Narration will be generated automatically for this project.",
    narrationStaleHint:
      "Subtitles changed. Narration is regenerating automatically to sync audio and timings.",
    narrationProcessingHint:
      "ElevenLabs is generating the MP3 and word timings for this project.",
    narrationTranscriptTitle: "Narration transcript",
    narrationTranscriptDesc:
      "Follow the generated voice reading your subtitles with word highlighting.",
  },
  es: {
    // Nav
    newProject: "Nuevo Proyecto",

    // Home
    projects: "Proyectos",
    manageProjects: "Administra tus proyectos de subtítulos de video",
    loadingProjects: "Cargando proyectos…",
    noProjectsYet: "Aún no hay proyectos",
    noProjectsDesc: "Crea tu primer proyecto para generar subtítulos",
    createProject: "Crear Proyecto",
    noVideoUploaded: "Sin video subido",
    deleteConfirm: "¿Eliminar este proyecto y todos sus datos?",
    cancel: "Cancelar",

    // New project
    backToProjects: "Volver a proyectos",
    newProjectTitle: "Nuevo Proyecto",
    newProjectDesc: "Sube un video y elige cómo generar los subtítulos",
    videoLabel: "Video",
    dropVideo: "Arrastra tu video aquí o",
    browse: "buscar",
    supportedFormats: "Soporta MP4, WebM · Máx 500 MB",
    clickToChange: "Clic para cambiar",
    titleLabel: "Título",
    titlePlaceholder: "Mi Video Tutorial",
    templateLabel: "Plantilla",
    tutorialLabel: "Tutorial paso a paso",
    tutorialDesc: "Guía a tu audiencia a través de un proceso, paso a paso",
    productDemoLabel: "Demo de Producto",
    productDemoDesc: "Muestra las mejores características de tu producto",
    invalidFileType: "Tipo de archivo inválido. Usa MP4 o WebM.",
    fileTooLarge: "Archivo demasiado grande. El máximo es 500 MB.",
    creatingProject: "Creando proyecto…",
    uploadingVideo: "Subiendo video…",
    done: "¡Listo!",
    failedCreate: "Error al crear el proyecto",
    failedUpload: "Error al subir el video",
    somethingWrong: "Algo salió mal",
    createAndUpload: "Crear Proyecto y Subir",

    // Project detail
    deleteProject: "Eliminar",
    deleteProjectConfirm: "¿Eliminar este proyecto?",
    loadingProject: "Cargando proyecto…",
    projectNotFound: "Proyecto no encontrado",
    noVideoYet: "Aún no se ha subido un video",
    uploadToStart: "Sube un video para comenzar",
    subtitles: "Subtítulos",
    segments: "segmentos",
    noSubtitlesYet: "Aún no hay subtítulos",
    noSubtitlesDesc:
      "Siguiente paso: extraer frames y generar subtítulos con IA",

    // Frame extraction
    extractFrames: "Extraer Frames",
    extractingFrames: "Extrayendo frames…",
    extractedFrames: "Frames Extraídos",
    framesCount: "frames",
    framesDesc: "Frames extraídos cada 2 segundos del video",
    noFramesYet: "Aún no se han extraído frames",
    noFramesDesc:
      "Extrae frames del video para preparar la generación de subtítulos",
    extractionFailed: "Error al extraer frames",
    frameAt: "Frame en",

    // Subtitle generation
    generateSubtitles: "Generar Subtítulos",
    generatingSubtitles: "Analizando frames con IA…",
    generateSubtitlesDesc:
      "Usa IA para analizar los frames extraídos y generar subtítulos",
    generationFailed: "Error al generar subtítulos",
    regenerateSubtitles: "Regenerar",

    // Subtitle editing
    editSubtitle: "Clic para editar",
    saveSubtitle: "Guardar",
    subtitleUpdated: "Subtítulo actualizado",
    subtitleUpdateFailed: "Error al actualizar subtítulo",
    clickToSeek: "Clic para saltar a este punto",

    // Screen recorder
    uploadFileTab: "Subir archivo",
    recordScreenTab: "Grabar pantalla",
    startRecording: "Iniciar Grabación",
    stopRecording: "Detener",
    pauseRecording: "Pausar",
    resumeRecording: "Reanudar",
    cancelRecording: "Cancelar",
    startCapture: "Iniciar",
    recordingStatus: "Grabando",
    pausedStatus: "Pausado",
    recordAgain: "Grabar de nuevo",
    recordScreenDesc: "Graba tu pantalla directamente desde el navegador",
    screenRecordingNotSupported:
      "La grabación de pantalla no es compatible con este navegador",
    screenRecordingTitle: "Grabación de Pantalla",

    // Timeline
    timeline: "Línea de tiempo",
    snapToGrid: "Ajustar a cuadrícula (0.5s)",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    subtitleOverlap: "Subtítulos superpuestos",
    timelineDragError: "Error al actualizar el timing del subtítulo",
    // Timeline advanced
    undo: "Deshacer",
    redo: "Rehacer",
    splitAtPlayhead: "Dividir en playhead",
    deleteSelected: "Eliminar seleccionado",
    captionsTrack: "Subtítulos",
    videoTrack: "Video",
    addMarker: "Agregar marcador",
    deleteMarker: "Eliminar marcador",
    markerColor: "Color del marcador",
    markerShape: "Forma del marcador",
    trimVideo: "Recortar video",
    deleteSection: "Eliminar sección",
    playPause: "Reproducir / Pausar",
    skipBack: "Retroceder 5s",
    skipForward: "Avanzar 5s",
    saveChanges: "Guardar",
    nothingSelected: "Nada seleccionado",
    deleteSubtitleConfirm: "¿Eliminar este subtítulo?",
    deleteSectionConfirm: "¿Eliminar esta sección del video?",
    changesSaved: "Cambios guardados",
    trackVisible: "Pista visible",
    trackHidden: "Pista oculta",
    subtitleDeleted: "Subtítulo eliminado",
    sectionDeleted: "Sección eliminada",
    markerAdded: "Marcador agregado",

    // Subtitle Style
    subtitleStyle: "Estilo de Subtítulos",
    fontFamily: "Fuente",
    fontSize: "Tamaño",
    textColor: "Color de Texto",
    background: "Fondo",
    opacity: "Opacidad",
    subtitleAnimation: "Animación",
    previewText: "Texto de vista previa",
    saveStyle: "Guardar Estilo",
    saving: "Guardando…",

    // Processing screen
    processingUpload: "Subiendo video",
    processingUploadDesc: "Transfiriendo tu video de forma segura",
    processingExtract: "Extrayendo frames",
    processingExtractDesc: "Capturando momentos clave de tu video",
    processingAnalyze: "Analizando video",
    processingAnalyzeDesc: "La IA está revisando el contenido de tu video",
    processingGenerate: "Generando subtítulos",
    processingGenerateDesc: "Creando subtítulos sincronizados con IA",
    processingCompleted: "Completado",
    processingInProgress: "En Progreso",
    processingError: "Error",
    processingAnalyzed: "analizado",
    processingVideoSubtitle:
      "Showguide está analizando el contenido de tu video...",
    processingStepOf: "Paso {current} de {total}",
    processingFailed: "El procesamiento falló. Intenta de nuevo.",
    retryProcessing: "Reintentar",
    processingLongVideoHint:
      "Los videos mas largos pueden tardar un poco mas en analizarse y subtitularse.",
    processingStayHere:
      "Podes quedarte en esta pantalla. Vamos a abrir el editor automaticamente cuando todo este listo.",
    processingStillWorking: "Seguimos procesando en segundo plano",
    processingElapsed: "Tiempo transcurrido",
    notifyWhenDone: "Notificarme al terminar",
    notificationsBlocked:
      "Notificaciones bloqueadas. Actívalas en la configuración del navegador.",
    notificationSubtitlesReady: "¡Tus subtítulos están listos!",
    notificationsDenied: "Permiso de notificaciones denegado",
    subtitleSaved: "Subtítulo guardado",
    styleSaved: "Estilo guardado",

    // Export
    exportVideo: "Exportar Video",
    exportingVideo: "Exportando video…",
    exportDesc: "Grabar subtítulos en el video y descargar el resultado",
    exportFailed: "Error al exportar",
    exportComplete: "¡Exportación completa!",
    downloadVideo: "Descargar Video",
    reExport: "Re-exportar",
    qualityLabel: "Calidad",
    quality1080: "1080p — Full HD",
    quality720: "720p — HD",
    quality480: "480p — SD",
    qualityBest: "Mejor calidad",
    qualityBalanced: "Equilibrado",
    qualitySmallFile: "Archivo más pequeño",

    // Nav links (landing)
    navHowItWorks: "Cómo Funciona",
    navFeatures: "Características",
    navFaq: "Preguntas",

    // Landing
    heroTitle: "Subtítulos con IA para tus Videos",
    heroSubtitle:
      "Sube tu video, deja que la IA analice cada frame y obtén subtítulos perfectamente sincronizados en segundos. Sin transcripción — nuestra IA de visión entiende lo que pasa en pantalla.",
    heroCta: "Empezar a Crear",
    heroSecondaryCta: "Ver Cómo Funciona",
    heroTag: "Impulsado por IA de Visión",

    howItWorksLabel: "Cómo Funciona",
    howItWorksTitle: "Tres Pasos para Subtítulos Perfectos",
    howItWorksSubtitle:
      "De video sin procesar a subtítulos pulidos en minutos, no horas.",
    step1Title: "Sube Tu Video",
    step1Desc:
      "Arrastra tu grabación de pantalla, tutorial o demo de producto — o graba tu pantalla directamente desde el navegador. Soportamos MP4 y WebM.",
    step2Title: "La IA Analiza Cada Frame",
    step2Desc:
      "Nuestra IA extrae frames clave y analiza visualmente lo que sucede — interacciones de UI, transiciones, texto en pantalla — para generar subtítulos contextuales.",
    step3Title: "Exporta y Comparte",
    step3Desc:
      "Revisa, edita si es necesario y exporta tu video con subtítulos integrados. Listo para redes sociales, documentación o tu sitio web.",

    featuresLabel: "Características",
    featuresTitle: "Todo lo que Necesitas",
    featuresSubtitle:
      "Hecho para creadores que quieren subtítulos profesionales sin el trabajo manual.",
    feature1Title: "IA de Visión, No Audio",
    feature1Desc:
      "A diferencia de herramientas tradicionales, analizamos lo que se ve en pantalla — perfecto para grabaciones silenciosas y tutoriales.",
    feature2Title: "Plantillas Inteligentes",
    feature2Desc:
      "Elige entre estilos de tutorial y demo de producto. La IA adapta su tono, ritmo e idioma a tu tipo de contenido.",
    feature3Title: "Multi-Idioma",
    feature3Desc:
      "Genera subtítulos en inglés, español o portugués. La IA escribe nativamente en tu idioma elegido, sin traducción automática.",
    feature4Title: "Sincronización Precisa",
    feature4Desc:
      "Cada subtítulo está precisamente sincronizado con la línea de tiempo del video. Sin ajustes manuales de timing.",
    feature5Title: "Edita y Refina",
    feature5Desc:
      "Control total de edición sobre cada subtítulo. Ajusta texto, timing y estilo antes de exportar.",
    feature6Title: "Exportación en Un Clic",
    feature6Desc:
      "Exporta tu video con subtítulos integrados. Sin herramientas externas ni flujos complejos.",

    pricingLabel: "Precios",
    pricingTitle: "Planes para pasar de una prueba rápida a un equipo completo",
    pricingSubtitle:
      "Empieza con un trial de USD 0.99, pasa a un flujo individual o despliega Showguide en todo tu equipo de producción.",
    pricingPerMonth: "por mes",
    pricingFeatured: "Más elegido",
    pricingPlanTrialName: "Trial",
    pricingPlanTrialDesc:
      "La forma más simple de validar tu flujo de subtítulos antes de escalarlo.",
    pricingPlanTrialBadge: "Entrada de USD 1",
    pricingPlanTrialCta: "Empezar Trial",
    pricingPlanTrialFeature1: "Acceso al editor completo de subtítulos",
    pricingPlanTrialFeature2: "Crea y exporta tu primer video guiado",
    pricingPlanTrialFeature3: "Prueba subtítulos con IA en proyectos reales",
    pricingPlanTrialFeature4: "Sube de plan sin migrar tu trabajo",
    pricingPlanPlusName: "Plus",
    pricingPlanPlusDesc:
      "Para creadores individuales que publican tutoriales y demos pulidos cada semana.",
    pricingPlanPlusBadge: "Creador individual",
    pricingPlanPlusCta: "Elegir Plus",
    pricingPlanPlusFeature1: "Pipeline semanal más rápido",
    pricingPlanPlusFeature2: "Presets reutilizables de estilo",
    pricingPlanPlusFeature3: "Exports listos para social y docs",
    pricingPlanPlusFeature4: "Pensado para producción individual",
    pricingPlanTeamsName: "Teams",
    pricingPlanTeamsDesc:
      "Para equipos chicos que necesitan estándares compartidos y handoff más limpio entre roles.",
    pricingPlanTeamsBadge: "Listo para colaborar",
    pricingPlanTeamsCta: "Elegir Teams",
    pricingPlanTeamsFeature1: "Workflow compartido entre creators y PMs",
    pricingPlanTeamsFeature2:
      "Salida de subtítulos consistente y lista para marca",
    pricingPlanTeamsFeature3: "Review y entrega con menos fricción",
    pricingPlanTeamsFeature4: "Mejor fit para equipos en crecimiento",
    pricingPlanProName: "Pro",
    pricingPlanProDesc:
      "Para operaciones de alto volumen que necesitan prioridad, workflows avanzados y soporte premium.",
    pricingPlanProBadge: "Plan de escala",
    pricingPlanProCta: "Hablar con ventas",
    pricingPlanProFeature1: "Rendering y export con prioridad",
    pricingPlanProFeature2: "Soporte para workflows avanzados de voz",
    pricingPlanProFeature3: "Acompañamiento operativo para equipos exigentes",
    pricingPlanProFeature4: "Diseñado para volumen de publicación serio",

    whoLabel: "Para Quién Es",
    whoTitle: "Hecho para Creadores Como Tú",
    whoSubtitle:
      "Ya sea que crees tutoriales, demos o contenido de capacitación — Showguide te ahorra horas.",
    who1Title: "Creadores de Contenido",
    who1Desc:
      "Crea tutoriales atractivos con subtítulos profesionales que mantienen a los espectadores viendo.",
    who2Title: "Equipos de Producto",
    who2Desc:
      "Construye demos de producto pulidos y videos de onboarding que hablan por sí mismos.",
    who3Title: "Educadores y Capacitadores",
    who3Desc:
      "Haz que el contenido de capacitación sea accesible y fácil de seguir con subtítulos claros paso a paso.",
    who4Title: "Equipos de Marketing",
    who4Desc:
      "Produce videos para redes sociales y contenido promocional con subtítulos que impulsan el engagement.",

    faqLabel: "Preguntas Frecuentes",
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "¿Tienes preguntas? Tenemos respuestas.",
    faq1Q: "¿Cómo genera Showguide subtítulos sin audio?",
    faq1A:
      "Showguide analiza visualmente lo que sucede en tu video — interacciones en pantalla, transiciones, texto visible — y escribe subtítulos que describen cada paso. No se necesita micrófono ni pista de audio.",
    faq2Q: "¿Qué formatos de video son compatibles?",
    faq2A:
      "Soportamos archivos MP4 y WebM. También puedes grabar tu pantalla directamente desde el navegador.",
    faq3Q: "¿Puedo editar los subtítulos generados?",
    faq3A:
      "¡Sí! Después de la generación, puedes revisar y editar cada subtítulo — texto, timing y estilo — antes de exportar tu video final.",
    faq4Q: "¿Qué idiomas son compatibles?",
    faq4A:
      "Actualmente inglés, español y portugués. Los subtítulos se escriben nativamente en tu idioma elegido, sin traducción automática.",
    faq5Q: "¿Mis datos de video están seguros?",
    faq5A:
      "Tus videos permanecen en tu infraestructura. Solo los frames necesarios se analizan para generar subtítulos, y nada se almacena externamente.",

    ctaTitle: "¿Listo para Agregar Subtítulos a tus Videos?",
    ctaSubtitle:
      "Empieza a crear subtítulos profesionales generados por IA en minutos.",
    ctaCta: "Comenzar Gratis",

    footerTagline: "Subtítulos con IA para el creador moderno.",
    footerProduct: "Producto",
    footerResources: "Recursos",
    footerLegal: "Legal",
    footerDashboard: "Panel",
    footerPricing: "Precios",
    footerChangelog: "Cambios",
    footerDocs: "Documentación",
    footerSupport: "Soporte",
    footerBlog: "Blog",
    footerPrivacy: "Privacidad",
    footerTerms: "Términos",

    dashboard: "Panel",
    settings: "Configuración",
    exports: "Exportaciones",
    usage: "Uso",
    createNewProject: "Crear Nuevo Proyecto",
    newVideoProject: "Nuevo Proyecto de Video",
    newVideoProjectDesc:
      "Sube un video o graba tu pantalla y deja que Showguide genere subtítulos automáticamente",
    uploadVideo: "Subir Video",
    recordScreen: "Grabar Pantalla",

    // Exports page
    exportsDesc: "Mira y descarga tus videos exportados",
    noExportsYet: "Sin exportaciones aún",
    noExportsDesc: "Tus videos exportados aparecerán aquí",

    // Usage page
    usageDesc: "Monitorea tus créditos de IA y uso de procesamiento de video",
    aiCredits: "Créditos de IA",
    videoMinutes: "Minutos de Video",
    exportsUsage: "Exportaciones",

    // Settings page
    settingsDesc: "Administra tu cuenta y preferencias",
    profile: "Perfil",
    preferences: "Preferencias",
    preferencesDesc:
      "Los ajustes de idioma y tema están disponibles en la barra lateral",

    // Language & Voice (new project)
    languageLabel: "Idioma de Subtítulos",
    languageEn: "Inglés",
    languageEs: "Español",
    languagePt: "Portugués",
    subtitleToneLabel: "Tono de subtítulos",
    subtitleToneHelper:
      "Ajusta cómo se redactan los subtítulos sin cambiar el prompt del tipo de video.",
    subtitleToneNeutralLabel: "Neutral",
    subtitleToneNeutralDesc:
      "Default equilibrado. Claro y flexible sin sentirse demasiado rígido ni demasiado informal.",
    subtitleToneFormalLabel: "Formal",
    subtitleToneFormalDesc:
      "Redacción más profesional y precisa manteniendo la lógica de la plantilla elegida.",
    subtitleToneCasualLabel: "Casual",
    subtitleToneCasualDesc:
      "Lenguaje más cercano y liviano sin perder la estructura de tutorial o demo.",
    voiceToggleLabel: "Activar Voz IA",
    voiceToggleDesc: "Genera una pista de audio narrada a partir de tus subtítulos",
    selectVoice: "Selecciona una voz",
    voiceNotAvailable: "La Voz IA no está disponible en este momento",
    loadingVoices: "Cargando voces…",
    previewVoice: "Escuchar",
    voiceIncompatibleWarning: "Esta voz puede no sonar natural en el idioma seleccionado",
    noVoicesForLanguage: "No hay voces optimizadas para este idioma. Mostrando todas las voces disponibles.",
    language: "Idioma",
    narrationPanelTitle: "Capa de narracion",
    narrationPanelDesc:
      "El editor mantiene esta pista de narracion actualizada automaticamente y te deja revisarla con transcript y playback.",
    narrationStatusIdle: "Sin generar",
    narrationStatusProcessing: "Generando",
    narrationStatusCompleted: "Lista",
    narrationStatusFailed: "Con error",
    narrationStatusStale: "Desactualizada",
    narrationStatusLoadFailed:
      "No se pudo actualizar el estado de la narracion",
    narrationReady: "La narracion ya esta lista",
    narrationReadyLabel: "Narracion lista para reproducir",
    narrationPendingLabel: "La narracion estara disponible automaticamente",
    narrationVoiceMissing:
      "Este proyecto no tiene una voz IA configurada desde la creacion.",
    narrationNeedsSubtitles:
      "Primero genera subtitulos para crear la narracion.",
    generateNarration: "Generar narracion",
    regenerateNarration: "Regenerar narracion",
    generatingNarration: "Generando narracion...",
    narrationGenerationStarted: "Se inicio la generacion de narracion",
    narrationGenerationFailed: "Fallo la generacion de narracion",
    playNarration: "Reproducir narracion",
    pauseNarration: "Pausar narracion",
    narrationSeek: "Mover narracion",
    narrationPlaybackFailed: "No se pudo reproducir el audio de narracion",
    narrationGeneratedAt: "Generada el",
    narrationTrack: "Narracion",
    muteNarration: "Mutear narracion",
    unmuteNarration: "Activar narracion",
    narrationAutoMode: "Auto",
    narrationMutedBadge: "Muteada",
    narrationTrackDisabled: "La voz IA no esta activada",
    narrationAutoPending:
      "La narracion se generara automaticamente para este proyecto.",
    narrationStaleHint:
      "Los subtitulos cambiaron. La narracion se esta regenerando automaticamente para sincronizar audio y timings.",
    narrationProcessingHint:
      "ElevenLabs esta generando el MP3 y los tiempos por palabra del proyecto.",
    narrationTranscriptTitle: "Transcript de narracion",
    narrationTranscriptDesc:
      "Segui la voz generada leyendo tus subtitulos con resaltado por palabra.",
  },
  pt: {
    // Nav
    newProject: "Novo Projeto",

    // Home
    projects: "Projetos",
    manageProjects: "Gerencie seus projetos de legendas de vídeo",
    loadingProjects: "Carregando projetos…",
    noProjectsYet: "Nenhum projeto ainda",
    noProjectsDesc: "Crie seu primeiro projeto para gerar legendas",
    createProject: "Criar Projeto",
    noVideoUploaded: "Sem vídeo enviado",
    deleteConfirm: "Excluir este projeto e todos os seus dados?",
    cancel: "Cancelar",

    // New project
    backToProjects: "Voltar aos projetos",
    newProjectTitle: "Novo Projeto",
    newProjectDesc: "Envie um vídeo e escolha como gerar as legendas",
    videoLabel: "Vídeo",
    dropVideo: "Arraste seu vídeo aqui ou",
    browse: "procurar",
    supportedFormats: "Suporta MP4, WebM · Máx 500 MB",
    clickToChange: "Clique para trocar",
    titleLabel: "Título",
    titlePlaceholder: "Meu Vídeo Tutorial",
    templateLabel: "Modelo",
    tutorialLabel: "Tutorial Passo a Passo",
    tutorialDesc: "Guie seu público através de um processo, passo a passo",
    productDemoLabel: "Demo de Produto",
    productDemoDesc: "Apresente as melhores funcionalidades do seu produto",
    invalidFileType: "Tipo de arquivo inválido. Use MP4 ou WebM.",
    fileTooLarge: "Arquivo muito grande. O máximo é 500 MB.",
    creatingProject: "Criando projeto…",
    uploadingVideo: "Enviando vídeo…",
    done: "Pronto!",
    failedCreate: "Falha ao criar o projeto",
    failedUpload: "Falha ao enviar o vídeo",
    somethingWrong: "Algo deu errado",
    createAndUpload: "Criar Projeto e Enviar",

    // Project detail
    deleteProject: "Excluir",
    deleteProjectConfirm: "Excluir este projeto?",
    loadingProject: "Carregando projeto…",
    projectNotFound: "Projeto não encontrado",
    noVideoYet: "Nenhum vídeo enviado ainda",
    uploadToStart: "Envie um vídeo para começar",
    subtitles: "Legendas",
    segments: "segmentos",
    noSubtitlesYet: "Nenhuma legenda ainda",
    noSubtitlesDesc: "Próximo passo: extrair frames e gerar legendas com IA",

    // Frame extraction
    extractFrames: "Extrair Frames",
    extractingFrames: "Extraindo frames…",
    extractedFrames: "Frames Extraídos",
    framesCount: "frames",
    framesDesc: "Frames extraídos a cada 2 segundos do vídeo",
    noFramesYet: "Nenhum frame extraído ainda",
    noFramesDesc: "Extraia frames do vídeo para preparar a geração de legendas",
    extractionFailed: "Falha ao extrair frames",
    frameAt: "Frame em",

    // Subtitle generation
    generateSubtitles: "Gerar Legendas",
    generatingSubtitles: "Analisando frames com IA…",
    generateSubtitlesDesc:
      "Use IA para analisar os frames extraídos e gerar legendas",
    generationFailed: "Falha ao gerar legendas",
    regenerateSubtitles: "Regenerar",

    // Subtitle editing
    editSubtitle: "Clique para editar",
    saveSubtitle: "Salvar",
    subtitleUpdated: "Legenda atualizada",
    subtitleUpdateFailed: "Falha ao atualizar legenda",
    clickToSeek: "Clique para pular para este ponto",

    // Screen recorder
    uploadFileTab: "Enviar arquivo",
    recordScreenTab: "Gravar tela",
    startRecording: "Iniciar Gravação",
    stopRecording: "Parar",
    pauseRecording: "Pausar",
    resumeRecording: "Retomar",
    cancelRecording: "Cancelar",
    startCapture: "Iniciar",
    recordingStatus: "Gravando",
    pausedStatus: "Pausado",
    recordAgain: "Gravar novamente",
    recordScreenDesc: "Grave sua tela diretamente do navegador",
    screenRecordingNotSupported:
      "A gravação de tela não é compatível com este navegador",
    screenRecordingTitle: "Gravação de Tela",

    // Timeline
    timeline: "Linha do tempo",
    snapToGrid: "Ajustar a grade (0.5s)",
    zoomIn: "Aproximar",
    zoomOut: "Afastar",
    subtitleOverlap: "Legendas sobrepostas",
    timelineDragError: "Erro ao atualizar o tempo da legenda",
    // Timeline advanced
    undo: "Desfazer",
    redo: "Refazer",
    splitAtPlayhead: "Dividir no playhead",
    deleteSelected: "Excluir selecionado",
    captionsTrack: "Legendas",
    videoTrack: "Vídeo",
    addMarker: "Adicionar marcador",
    deleteMarker: "Excluir marcador",
    markerColor: "Cor do marcador",
    markerShape: "Forma do marcador",
    trimVideo: "Cortar vídeo",
    deleteSection: "Excluir seção",
    playPause: "Reproduzir / Pausar",
    skipBack: "Voltar 5s",
    skipForward: "Avançar 5s",
    saveChanges: "Salvar",
    nothingSelected: "Nada selecionado",
    deleteSubtitleConfirm: "Excluir esta legenda?",
    deleteSectionConfirm: "Excluir esta seção do vídeo?",
    changesSaved: "Alterações salvas",
    trackVisible: "Faixa visível",
    trackHidden: "Faixa oculta",
    subtitleDeleted: "Legenda excluída",
    sectionDeleted: "Seção excluída",
    markerAdded: "Marcador adicionado",

    // Subtitle Style
    subtitleStyle: "Estilo de Legendas",
    fontFamily: "Fonte",
    fontSize: "Tamanho",
    textColor: "Cor do Texto",
    background: "Fundo",
    opacity: "Opacidade",
    subtitleAnimation: "Animação",
    previewText: "Texto de visualização",
    saveStyle: "Salvar Estilo",
    saving: "Salvando…",

    // Processing screen
    processingUpload: "Enviando vídeo",
    processingUploadDesc: "Transferindo seu vídeo com segurança",
    processingExtract: "Extraindo frames",
    processingExtractDesc: "Capturando momentos-chave do seu vídeo",
    processingAnalyze: "Analisando vídeo",
    processingAnalyzeDesc: "A IA está revisando o conteúdo do seu vídeo",
    processingGenerate: "Gerando legendas",
    processingGenerateDesc: "Criando legendas sincronizadas com IA",
    processingCompleted: "Concluído",
    processingInProgress: "Em Progresso",
    processingError: "Erro",
    processingAnalyzed: "analisado",
    processingVideoSubtitle:
      "Showguide está analisando o conteúdo do seu vídeo...",
    processingStepOf: "Passo {current} de {total}",
    processingFailed: "O processamento falhou. Tente novamente.",
    retryProcessing: "Tentar novamente",
    processingLongVideoHint:
      "Videos mais longos podem levar um pouco mais de tempo para analisar e gerar legendas.",
    processingStayHere:
      "Voce pode ficar nesta tela. Vamos abrir o editor automaticamente quando tudo estiver pronto.",
    processingStillWorking: "Ainda processando em segundo plano",
    processingElapsed: "Tempo decorrido",
    notifyWhenDone: "Notificar quando terminar",
    notificationsBlocked:
      "Notificações bloqueadas. Ative-as nas configurações do navegador.",
    notificationSubtitlesReady: "Suas legendas estão prontas!",
    notificationsDenied: "Permissão de notificações negada",
    subtitleSaved: "Legenda salva",
    styleSaved: "Estilo salvo",

    // Export
    exportVideo: "Exportar Vídeo",
    exportingVideo: "Exportando vídeo…",
    exportDesc: "Gravar legendas no vídeo e baixar o resultado",
    exportFailed: "Falha ao exportar",
    exportComplete: "Exportação concluída!",
    downloadVideo: "Baixar Vídeo",
    reExport: "Re-exportar",
    qualityLabel: "Qualidade",
    quality1080: "1080p — Full HD",
    quality720: "720p — HD",
    quality480: "480p — SD",
    qualityBest: "Melhor qualidade",
    qualityBalanced: "Equilibrado",
    qualitySmallFile: "Arquivo menor",

    // Nav links (landing)
    navHowItWorks: "Como Funciona",
    navFeatures: "Recursos",
    navFaq: "Perguntas",

    // Landing
    heroTitle: "Legendas com IA para seus Vídeos",
    heroSubtitle:
      "Envie seu vídeo, deixe a IA analisar cada frame e obtenha legendas perfeitamente sincronizadas em segundos. Sem transcrição — nossa IA de visão entende o que acontece na tela.",
    heroCta: "Começar a Criar",
    heroSecondaryCta: "Veja Como Funciona",
    heroTag: "Impulsionado por IA de Visão",

    howItWorksLabel: "Como Funciona",
    howItWorksTitle: "Três Passos para Legendas Perfeitas",
    howItWorksSubtitle:
      "De vídeo bruto a legendas polidas em minutos, não horas.",
    step1Title: "Envie Seu Vídeo",
    step1Desc:
      "Arraste sua gravação de tela, tutorial ou demo de produto — ou grave sua tela diretamente do navegador. Suportamos MP4 e WebM.",
    step2Title: "A IA Analisa Cada Frame",
    step2Desc:
      "Nossa IA extrai frames-chave e analisa visualmente o que acontece — interações de UI, transições, texto na tela — para gerar legendas contextuais.",
    step3Title: "Exporte e Compartilhe",
    step3Desc:
      "Revise, edite se necessário e exporte seu vídeo com legendas integradas. Pronto para redes sociais, documentação ou seu site.",

    featuresLabel: "Recursos",
    featuresTitle: "Tudo o que Você Precisa",
    featuresSubtitle:
      "Feito para criadores que querem legendas profissionais sem o trabalho manual.",
    feature1Title: "IA de Visão, Não Áudio",
    feature1Desc:
      "Diferente de ferramentas tradicionais, analisamos o que é visível na tela — perfeito para gravações silenciosas e tutoriais.",
    feature2Title: "Modelos Inteligentes",
    feature2Desc:
      "Escolha entre estilos de tutorial e demo de produto. A IA adapta seu tom, ritmo e idioma ao seu tipo de conteúdo.",
    feature3Title: "Multi-Idioma",
    feature3Desc:
      "Gere legendas em inglês, espanhol ou português. A IA escreve nativamente no idioma escolhido, sem tradução automática.",
    feature4Title: "Sincronização Precisa",
    feature4Desc:
      "Cada legenda é precisamente sincronizada com a linha do tempo do vídeo. Sem ajustes manuais de timing.",
    feature5Title: "Edite e Refine",
    feature5Desc:
      "Controle total de edição sobre cada legenda. Ajuste texto, timing e estilo antes de exportar.",
    feature6Title: "Exportação em Um Clique",
    feature6Desc:
      "Exporte seu vídeo com legendas integradas. Sem ferramentas externas ou fluxos complexos.",

    pricingLabel: "Preços",
    pricingTitle:
      "Planos para sair do primeiro teste e chegar a uma operação completa",
    pricingSubtitle:
      "Comece com um trial de USD 0.99, avance para um fluxo individual ou leve o Showguide para todo o time de produção.",
    pricingPerMonth: "por mês",
    pricingFeatured: "Mais popular",
    pricingPlanTrialName: "Trial",
    pricingPlanTrialDesc:
      "A forma mais simples de validar seu fluxo de legendas antes de escalar.",
    pricingPlanTrialBadge: "Entrada de USD 1",
    pricingPlanTrialCta: "Começar Trial",
    pricingPlanTrialFeature1: "Acesso ao editor completo de legendas",
    pricingPlanTrialFeature2: "Crie e exporte seu primeiro vídeo guiado",
    pricingPlanTrialFeature3: "Teste legendas com IA em projetos reais",
    pricingPlanTrialFeature4: "Faça upgrade sem migrar seu trabalho",
    pricingPlanPlusName: "Plus",
    pricingPlanPlusDesc:
      "Para criadores solo que publicam tutoriais e demos polidos toda semana.",
    pricingPlanPlusBadge: "Criador solo",
    pricingPlanPlusCta: "Escolher Plus",
    pricingPlanPlusFeature1: "Pipeline semanal mais rápido",
    pricingPlanPlusFeature2: "Presets reutilizáveis de estilo",
    pricingPlanPlusFeature3: "Exports prontos para social e docs",
    pricingPlanPlusFeature4: "Pensado para produção individual",
    pricingPlanTeamsName: "Teams",
    pricingPlanTeamsDesc:
      "Para equipes pequenas que precisam de padrões compartilhados e handoff mais limpo entre funções.",
    pricingPlanTeamsBadge: "Pronto para colaborar",
    pricingPlanTeamsCta: "Escolher Teams",
    pricingPlanTeamsFeature1: "Workflow compartilhado entre creators e PMs",
    pricingPlanTeamsFeature2:
      "Saída de legendas consistente e pronta para a marca",
    pricingPlanTeamsFeature3: "Revisão e entrega com menos atrito",
    pricingPlanTeamsFeature4: "Melhor ajuste para times em crescimento",
    pricingPlanProName: "Pro",
    pricingPlanProDesc:
      "Para operações de alto volume que precisam de prioridade, workflows avançados e suporte premium.",
    pricingPlanProBadge: "Plano de escala",
    pricingPlanProCta: "Falar com vendas",
    pricingPlanProFeature1: "Renderização e export com prioridade",
    pricingPlanProFeature2: "Suporte para workflows avançados de voz",
    pricingPlanProFeature3: "Acompanhamento operacional para equipes exigentes",
    pricingPlanProFeature4: "Desenhado para volume sério de publicação",

    whoLabel: "Para Quem É",
    whoTitle: "Feito para Criadores Como Você",
    whoSubtitle:
      "Seja criando tutoriais, demos ou conteúdo de treinamento — Showguide economiza horas.",
    who1Title: "Criadores de Conteúdo",
    who1Desc:
      "Crie tutoriais envolventes com legendas profissionais que mantêm os espectadores assistindo.",
    who2Title: "Equipes de Produto",
    who2Desc:
      "Construa demos de produto polidos e vídeos de onboarding que falam por si mesmos.",
    who3Title: "Educadores e Treinadores",
    who3Desc:
      "Torne o conteúdo de treinamento acessível e fácil de seguir com legendas claras passo a passo.",
    who4Title: "Equipes de Marketing",
    who4Desc:
      "Produza vídeos para redes sociais e conteúdo promocional com legendas que impulsionam o engajamento.",

    faqLabel: "Perguntas Frequentes",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Tem perguntas? Temos respostas.",
    faq1Q: "Como o Showguide gera legendas sem áudio?",
    faq1A:
      "O Showguide analisa visualmente o que acontece no seu vídeo — interações na tela, transições, texto visível — e escreve legendas que descrevem cada passo. Não é necessário microfone ou faixa de áudio.",
    faq2Q: "Quais formatos de vídeo são suportados?",
    faq2A:
      "Suportamos arquivos MP4 e WebM. Você também pode gravar sua tela diretamente do navegador.",
    faq3Q: "Posso editar as legendas geradas?",
    faq3A:
      "Sim! Após a geração, você pode revisar e editar cada legenda — texto, timing e estilo — antes de exportar seu vídeo final.",
    faq4Q: "Quais idiomas são suportados?",
    faq4A:
      "Atualmente inglês, espanhol e português. As legendas são escritas nativamente no idioma escolhido, sem tradução automática.",
    faq5Q: "Meus dados de vídeo estão seguros?",
    faq5A:
      "Seus vídeos permanecem em sua infraestrutura. Apenas os frames necessários são analisados para gerar legendas, e nada é armazenado externamente.",

    ctaTitle: "Pronto para Adicionar Legendas aos seus Vídeos?",
    ctaSubtitle:
      "Comece a criar legendas profissionais geradas por IA em minutos.",
    ctaCta: "Começar Grátis",

    footerTagline: "Legendas com IA para o criador moderno.",
    footerProduct: "Produto",
    footerResources: "Recursos",
    footerLegal: "Legal",
    footerDashboard: "Painel",
    footerPricing: "Preços",
    footerChangelog: "Mudanças",
    footerDocs: "Documentação",
    footerSupport: "Suporte",
    footerBlog: "Blog",
    footerPrivacy: "Privacidade",
    footerTerms: "Termos",

    dashboard: "Painel",
    settings: "Configurações",
    exports: "Exportações",
    usage: "Uso",
    createNewProject: "Criar Novo Projeto",
    newVideoProject: "Novo Projeto de Vídeo",
    newVideoProjectDesc:
      "Envie um vídeo ou grave sua tela e deixe o Showguide gerar legendas automaticamente",
    uploadVideo: "Enviar Vídeo",
    recordScreen: "Gravar Tela",

    // Exports page
    exportsDesc: "Veja e baixe seus vídeos exportados",
    noExportsYet: "Nenhuma exportação ainda",
    noExportsDesc: "Seus vídeos exportados aparecerão aqui",

    // Usage page
    usageDesc: "Monitore seus créditos de IA e uso de processamento de vídeo",
    aiCredits: "Créditos de IA",
    videoMinutes: "Minutos de Vídeo",
    exportsUsage: "Exportações",

    // Settings page
    settingsDesc: "Gerencie sua conta e preferências",
    profile: "Perfil",
    preferences: "Preferências",
    preferencesDesc:
      "As configurações de idioma e tema estão disponíveis na barra lateral",

    // Language & Voice (new project)
    languageLabel: "Idioma das Legendas",
    languageEn: "Inglês",
    languageEs: "Espanhol",
    languagePt: "Português",
    subtitleToneLabel: "Tom das legendas",
    subtitleToneHelper:
      "Ajusta como as legendas são escritas sem mudar o prompt do tipo de vídeo.",
    subtitleToneNeutralLabel: "Neutro",
    subtitleToneNeutralDesc:
      "Padrão equilibrado. Claro e flexível sem soar rígido demais nem casual demais.",
    subtitleToneFormalLabel: "Formal",
    subtitleToneFormalDesc:
      "Redação mais profissional e precisa mantendo a lógica do template escolhido.",
    subtitleToneCasualLabel: "Casual",
    subtitleToneCasualDesc:
      "Linguagem mais próxima e leve sem perder a estrutura de tutorial ou demo.",
    voiceToggleLabel: "Ativar Voz IA",
    voiceToggleDesc: "Gere uma faixa de áudio narrada a partir das suas legendas",
    selectVoice: "Selecione uma voz",
    voiceNotAvailable: "A Voz IA não está disponível no momento",
    loadingVoices: "Carregando vozes…",
    previewVoice: "Ouvir",
    voiceIncompatibleWarning: "Esta voz pode não soar natural no idioma selecionado",
    noVoicesForLanguage: "Sem vozes otimizadas para este idioma. Mostrando todas as vozes disponíveis.",
    language: "Idioma",
    narrationPanelTitle: "Camada de narracao",
    narrationPanelDesc:
      "O editor mantem esta faixa de narracao atualizada automaticamente e permite revisar tudo com transcript e playback.",
    narrationStatusIdle: "Nao gerada",
    narrationStatusProcessing: "Gerando",
    narrationStatusCompleted: "Pronta",
    narrationStatusFailed: "Com erro",
    narrationStatusStale: "Desatualizada",
    narrationStatusLoadFailed:
      "Nao foi possivel atualizar o status da narracao",
    narrationReady: "A narracao esta pronta",
    narrationReadyLabel: "Narracao pronta para reproduzir",
    narrationPendingLabel: "A narracao ficara disponivel automaticamente",
    narrationVoiceMissing:
      "Este projeto nao tem uma voz de IA configurada desde a criacao.",
    narrationNeedsSubtitles:
      "Primeiro gere legendas para criar a narracao.",
    generateNarration: "Gerar narracao",
    regenerateNarration: "Gerar novamente",
    generatingNarration: "Gerando narracao...",
    narrationGenerationStarted: "A geracao da narracao foi iniciada",
    narrationGenerationFailed: "Falha ao gerar a narracao",
    playNarration: "Reproduzir narracao",
    pauseNarration: "Pausar narracao",
    narrationSeek: "Mover narracao",
    narrationPlaybackFailed: "Nao foi possivel reproduzir o audio da narracao",
    narrationGeneratedAt: "Gerada em",
    narrationTrack: "Narracao",
    muteNarration: "Mutar narracao",
    unmuteNarration: "Ativar narracao",
    narrationAutoMode: "Auto",
    narrationMutedBadge: "Mutada",
    narrationTrackDisabled: "A voz IA nao esta ativada",
    narrationAutoPending:
      "A narracao sera gerada automaticamente para este projeto.",
    narrationStaleHint:
      "As legendas mudaram. A narracao esta sendo regenerada automaticamente para sincronizar audio e timings.",
    narrationProcessingHint:
      "A ElevenLabs esta gerando o MP3 e os tempos por palavra deste projeto.",
    narrationTranscriptTitle: "Transcript da narracao",
    narrationTranscriptDesc:
      "Acompanhe a voz gerada lendo suas legendas com destaque palavra por palavra.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  const lang = navigator.language.split("-")[0].toLowerCase();
  if (supportedLocales.includes(lang as Locale)) return lang as Locale;
  return defaultLocale;
}

export function getTranslations(locale: Locale) {
  return translations[locale];
}
