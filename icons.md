# 🎨 Icon Reference Guide

Copy-paste these icons for use in `tours.json` menus and script files.

## 🚀 Getting Started & Navigation
```
🚀 - Getting Started / Launch
🎯 - Target / Goals
📍 - Location / Pin
🧭 - Navigation / Compass
🗺️ - Map / Overview
🏁 - Start / Finish
⭐ - Important / Featured
🔰 - Beginner / Shield
```

## ⚡ Advanced & Power Tools
```
⚡ - Advanced / Power
🔧 - Tools / Configuration
⚙️ - Settings / Gear
🛠️ - Utilities / Repair
🔩 - Engineering / Hardware
💡 - Ideas / Tips
🎛️ - Control Panel
🔬 - Analysis / Science
```

## 🎨 Visual & Design
```
🎨 - Visual Tools / Art
🖌️ - Paint / Brush
🎭 - Themes / Style
🌈 - Colors / Palette
👁️ - View / Visibility
📸 - Screenshots / Images
🖼️ - Pictures / Gallery
✨ - Effects / Magic
```

## 🔍 Debug & Development
```
🔍 - Debug / Search
🐛 - Bug / Issues
🔬 - Inspect / Analyze
📊 - Data / Charts
📈 - Performance / Metrics
🧪 - Testing / Experiments
⚠️ - Warnings / Alerts
🚨 - Errors / Critical
```

## 📁 File & Data Management
```
📁 - Files / Folders
📂 - Open Folder
📄 - Documents
💾 - Save / Storage
📋 - Clipboard / Copy
📤 - Upload / Export
📥 - Download / Import
🗃️ - Archive / Database
```

## 💼 Productivity & Work
```
💼 - Business / Work
📝 - Notes / Writing
✅ - Tasks / Complete
📅 - Calendar / Schedule
⏰ - Time / Deadline
🚀 - Performance / Speed
📊 - Reports / Analytics
🎯 - Focus / Goals
```

## 🔒 Security & Admin
```
🔒 - Security / Lock
🔑 - Keys / Access
👑 - Admin / Authority
🛡️ - Protection / Shield
🔐 - Encryption / Private
👤 - User / Profile
👥 - Team / Groups
🏢 - Organization / Company
```

## 🌐 Network & Communication
```
🌐 - Network / Global
📡 - Communication / Signal
💬 - Chat / Messages
📧 - Email / Mail
🔗 - Links / Connection
📲 - Mobile / Notifications
🔊 - Audio / Sound
📺 - Display / Screen
```

## ⚽ Actions & Movement
```
▶️ - Play / Start
⏸️ - Pause / Stop
⏭️ - Next / Forward
⏮️ - Previous / Back
🔄 - Refresh / Reload
↩️ - Undo / Return
↪️ - Redo / Forward
🔀 - Random / Shuffle
```

## 📈 Status & Indicators
```
✅ - Success / Done
❌ - Error / Failed
⚠️ - Warning / Caution
ℹ️ - Info / Information
🟢 - Active / Online
🔴 - Inactive / Offline
🟡 - Pending / Warning
🔵 - Normal / Default
```

## 🎮 Interactive & Fun
```
🎮 - Games / Interactive
🎲 - Random / Chance
🎪 - Fun / Entertainment
🎊 - Celebration / Success
🎁 - Rewards / Gifts
🏆 - Achievement / Winner
⭐ - Rating / Favorites
💫 - Special / Premium
```

## 💻 Technology & Code
```
💻 - Computer / Tech
📱 - Mobile / Apps
⌨️ - Keyboard / Input
🖱️ - Mouse / Click
💾 - Database / Storage
🔌 - Plugins / Extensions
🖥️ - Desktop / Monitor
📟 - Device / Hardware
```

## 📚 Learning & Help
```
📚 - Documentation / Books
❓ - Help / Questions
💬 - Tutorial / Guide
🎓 - Learning / Education
📖 - Manual / Reference
💡 - Tips / Ideas
🔍 - Search / Find
📝 - Instructions / Notes
```

## Usage Examples

### In tours.json:
```json
{
  "menus": [
    {
      "id": "getting-started",
      "label": "Getting Started", 
      "icon": "🚀",
      "order": 1
    },
    {
      "id": "visual-tools",
      "label": "Visual Tools",
      "icon": "🎨", 
      "order": 2
    }
  ]
}
```

### In script files:
```javascript
window.DAP_MENUS.push({
  id: 'debug-tools',
  label: 'Debug Tools',
  icon: '🔍',
  order: 3
});
```

## Tips
- Choose icons that clearly represent the function
- Keep icons consistent across similar categories  
- Test that icons display correctly on all target platforms
- Consider using simpler icons for better cross-platform compatibility