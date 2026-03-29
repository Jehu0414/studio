# **App Name**: Harmony Vault

## Core Features:

- Admin Content Management: Admins can create, read, update, and delete musical assets (chords, setlists, notes, song/video links, images). All changes are persisted locally for immediate offline access and then synchronized to remote storage when online.
- User Authentication & Authorization: Secure login for both admins and regular users. Roles determine access to content management features. Authentication uses client-side tokens for offline verification once logged in.
- Offline Content Library: Users can browse and search through all available musical assets. Content viewed or marked for offline access is cached locally via Service Workers and IndexedDB, ensuring availability without an internet connection.
- Media Playback & Viewer: Integrated player for embedded songs/videos and image viewer for uploaded media, optimized for offline use of downloaded assets.
- Intelligent Chord Transposer: An AI-powered tool that allows admins and users to transpose entire chord progressions into different musical keys, suggesting optimal voicings or simpler chords for the target key.
- Progressive Web App (PWA) Features: The application is installable on devices and provides a seamless offline experience through Service Workers for asset caching and background synchronization, making it truly 100% offline-capable after initial setup.

## Style Guidelines:

- Scheme: Dark. Chosen to foster focus and professionalism, creating a sophisticated and modern environment suitable for deep work and performance contexts.
- Primary color: #9999EB. A deep, muted blue-violet (HSL: 240, 40%, 70%), providing a creative yet stable feel that stands out clearly against the dark background.
- Background color: #15151A. A very dark gray with a subtle blue-violet tint (HSL: 240, 15%, 10%), ensuring minimal distraction for content focus.
- Accent color: #66DCF7. A bright, clear cyan (HSL: 210, 80%, 70%) for calls-to-action and key interactive elements, providing strong contrast and visual hierarchy.
- Headline font: 'Space Grotesk' (sans-serif), for a modern, techy, and sharp aesthetic. Body text font: 'Inter' (sans-serif), chosen for its excellent readability and neutral, objective feel for longer content like notes and chord charts.
- Utilize clear and recognizable icons, incorporating standard musical notation symbols where appropriate, to enhance usability and context for musicians.
- Implement a clean, organized, and responsive layout, with adaptive interfaces that seamlessly transition from desktop for administrative tasks to mobile for performance or practice, utilizing tabbed sections or a discreet sidebar for navigation.
- Subtle and purposeful animations, such as smooth transitions for content loading and state changes, will be used to improve user experience without creating distractions, reinforcing a professional and efficient environment.