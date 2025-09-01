# 🚀 GitHub Setup Guide

This guide will walk you through setting up your GitHub repository and pushing your Examination System project.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Your project files ready

## 🔧 Step-by-Step Setup

### 1. Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `examination-system` (or your preferred name)
   - **Description**: `A comprehensive web-based examination system with user authentication and quiz functionality`
   - **Visibility**: Choose Public or Private
   - **Initialize with**: Leave unchecked (we already have files)
5. Click **"Create repository"**

### 2. Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Add the remote origin (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/examination-system.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin master
```

### 3. Alternative: Using SSH (Recommended for frequent use)

If you prefer SSH (more secure and convenient):

```bash
# Add SSH remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/examination-system.git

# Verify the remote
git remote -v

# Push to GitHub
git push -u origin master
```

### 4. Set Up SSH Keys (Optional but Recommended)

If you don't have SSH keys set up:

1. **Generate SSH key**:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. **Add SSH key to SSH agent**:
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Copy your public key**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. **Add to GitHub**:
   - Go to GitHub Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key and save

## 🎯 Quick Commands Summary

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/examination-system.git

# Push to GitHub
git push -u origin master

# For future updates
git add .
git commit -m "Your commit message"
git push
```

## 🔄 Updating Your Repository

After making changes to your code:

```bash
# Stage all changes
git add .

# Commit changes with a descriptive message
git commit -m "Add new feature: description of what you added"

# Push to GitHub
git push
```

## 📱 GitHub Repository Features

Once your repository is on GitHub, you can:

- **Issues**: Track bugs and feature requests
- **Projects**: Organize tasks and milestones
- **Wiki**: Create documentation
- **Actions**: Set up automated workflows
- **Pages**: Host your project online
- **Releases**: Version your software

## 🌟 Repository Settings to Consider

1. **Topics**: Add relevant topics like `examination-system`, `quiz-app`, `javascript`, `html`, `css`
2. **Description**: Update the repository description
3. **Website**: Add your project URL if you deploy it
4. **Social Preview**: Add a custom image for social media sharing

## 🚨 Troubleshooting

### Common Issues:

1. **Authentication Error**:
   - Use personal access token instead of password
   - Or set up SSH keys

2. **Remote Already Exists**:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/YOUR_USERNAME/examination-system.git
   ```

3. **Push Rejected**:
   ```bash
   git pull origin master
   git push origin master
   ```

## 📞 Need Help?

- Check [GitHub Help](https://help.github.com/)
- Review [Git Documentation](https://git-scm.com/doc)
- Search for solutions on [Stack Overflow](https://stackoverflow.com/)

---

**🎉 Congratulations!** Once you complete these steps, your Examination System will be live on GitHub for the world to see!
