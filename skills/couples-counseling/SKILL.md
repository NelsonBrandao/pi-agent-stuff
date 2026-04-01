---
name: couples-counseling
description: "Self-reflective session where pi reviews its own source code, your previous sessions, installed extensions, and skills to suggest improvements to your workflow — better ways to use pi, extensions or skills you should create, and habits to adopt."
---

# Couples Counseling

You are acting as a relationship counselor between the user and pi (yourself). Your goal is to help the user get the most out of working with you by deeply understanding both sides: what you're capable of, and how the user actually uses you.

## Step 1: Review your own capabilities

Read the pi documentation to understand what features are available:

```bash
cat ~/.nvm/versions/node/v25.6.1/lib/node_modules/@mariozechner/pi-coding-agent/README.md
```

Then read the extensions doc:

```bash
cat ~/.nvm/versions/node/v25.6.1/lib/node_modules/@mariozechner/pi-coding-agent/docs/extensions.md
```

And the skills doc:

```bash
cat ~/.nvm/versions/node/v25.6.1/lib/node_modules/@mariozechner/pi-coding-agent/docs/skills.md
```

## Step 2: Review installed extensions and skills

Check what the user already has set up:

```bash
ls ~/.pi/agent/extensions/
ls ~/.pi/agent/skills/
```

For each extension directory, read the main file to understand what it does:

```bash
find ~/.pi/agent/extensions/ -name "index.ts" -o -name "*.ts" -maxdepth 2 | head -20
```

Read each one to understand the user's current setup.

Also check for project-local extensions and skills:

```bash
ls .pi/extensions/ 2>/dev/null
ls .pi/skills/ 2>/dev/null
```

## Step 3: Review previous sessions

Look at the user's session history to understand their usage patterns:

```bash
ls -lt ~/.pi/agent/sessions/ | head -20
```

Then look at the most recent session directories:

```bash
for dir in $(ls -t ~/.pi/agent/sessions/ | head -5); do
  echo "=== $dir ==="
  ls -lt ~/.pi/agent/sessions/"$dir"/ | head -5
  echo ""
done
```

For the most recent sessions, read the first ~100 lines to understand what the user typically works on:

```bash
for dir in $(ls -t ~/.pi/agent/sessions/ | head -3); do
  latest=$(ls -t ~/.pi/agent/sessions/"$dir"/ | head -1)
  echo "=== $dir / $latest ==="
  head -100 ~/.pi/agent/sessions/"$dir"/"$latest"
  echo -e "\n\n"
done
```

## Step 4: Check settings and configuration

```bash
cat ~/.pi/agent/settings.json 2>/dev/null
cat .pi/settings.json 2>/dev/null
```

## Step 5: Provide your assessment

Based on everything you've reviewed, provide a thoughtful assessment organized as:

### 🔍 How You Currently Use Pi
Summarize the user's patterns — what they use pi for, how they interact, what tools/features they rely on.

### ✅ What's Working Well
Highlight good practices and effective usage patterns you've observed.

### 💡 Ways to Improve Your Workflow
Concrete suggestions for getting more out of pi — features they're not using, better ways to prompt, shortcuts they might not know about.

### 🧩 Extensions You Should Build
Based on their usage patterns and pain points, suggest specific extensions that would help. Include a brief description of what each would do and why it would help.

### 📚 Skills You Should Create
Suggest skills that would streamline repetitive tasks you've seen in their sessions. Be specific about what each skill would automate.

### 🤝 How We Can Work Better Together
Meta-advice on the human-AI collaboration — communication patterns, when to give more/less context, when to use skills vs free-form prompts, etc.

Be honest, specific, and constructive. Reference actual sessions and patterns you observed. Avoid generic advice — everything should be tailored to what you found.
