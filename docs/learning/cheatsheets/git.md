---
title: Git
---

```bash
git help                             // help
git help config                      // possible commands for config

## config
git config --list                    // displays all configs
git config --global user.name "Me"   // globally defines user name
git config user.name "Me"            // locally defines user name
git config --global alias.st status  // sets alias for status (we can then write git st)

## basics
git init                             // initialize an empty Git repository
git add README.txt                   // adds file to staging area
git rm README.txt                    // removes readme.txt
git rm --cached README.txt           // unstages file
git reset README.txt                 // removes file from stage
git commit -m "Create a README"      // creates an commit
git add --all                        // adds everything into staging area
git add FILE1.TXT FILE2.TXT          // adds multiple files into staging area
git add docs/*.txt                   // adds docs/*.txt files
git add docs/                        // add all files in docs directory
git log                              // displays recent commits
git clone --recursively <path>       // clones the repository recursively

## diff
git diff                             // displays differences
git diff --staged                    // displays staged differences
git diff HEAD                        // diff from latest commit
git diff HEAD^                       // diff from parent of latest commit
git diff f5acd..f656a                // diff between X and Y commits
git diff master bird                 // diff between X and Y branches

## reset
git checkout -- .                    // blows aways all changes since last commit
git checkout -- readme.txt           // blows aways all changes for one file
git commit -a -m "Modify Readme"     // stages and commits change
git reset --soft HEAD^               // reset into staging (^ is for ONE commit before head)
git commit --amend -m "Modified XX"  // add to the last commit, we can specify a new commit message
git checkout 0156fsc                 // goes to the commit 0156fsc
git checkout 0156fsc~1 -- fileX      // takes fileX from one commit BEHIND 0156fsc (good for revert)
git reset --hard HEAD                // undo all changes
git reset --hard HEAD^               // undo last commit and all changes
git reset --hard HEAD^^              // undo last 2 commits and all changes
git reset --hard HEAD@{30}           // undo last 30 commits (usable for broken rebase)
// SOFT = destroy commits but preserve staged changes
// HARD = nuke commits and all changes
git revert --no-commit <commit>      // reverts all changes from <commit>, even if its a long ago
git clean -f                         // removes unwanted files from the working dir

## remote
git remote add origin <url>          // adds a new remote repository and names it as "origin"

git push -u <name> <branch>           // push to remote (-u caches the name and branch for the next use)
git push -u origin master             // pushes to origin/master
git push origin branch1:branch2       // pushes a branch with new changes (branch1) into another branch (branch2)
git remote -v                         // displays all remote repos, verbose option (verbose=extended)
git remote rm <name>                  // removes remote

git pull                              // pulls changes down from the remote (git fetch + git merge origin/<branch>)
git fetch                             // just makes your repository up to date 

## tags
// tag is a reference to a commit (used for release versinoning)
git tag                               // displays all tags;
git checkout v1.0                     // check outs tag (-f option will force the reversion)
git tag -a v0.3 -m "version 0.3"      // creates a new tag
git push --tags                       // pushes tag to server

## branch
git clone <url> <folder>              // clones the repository into <folder>
git branch cat                        // creates a branch CAT
git checkout cat                      // jumps on cat branch
git checkout -b admin                 // creates and jumps to admin branch
git merge cat                         // merges cat into <current branch>
git branch -d cat                     // removes cat branch
git branch -D cat                     // force remove branch
git push origin --delete <branch>     // removes origin branch
git branch                            // displays name of the current branch
git switch cat                        // same as git checkout cat
git switch -                          // switches to the branch we came from

## merge
// git uses VI if no default editor is set
// j = down, k = up, h = left, l = right, esc = leave mode, :wq = save&quit
// i = insert mode, :q! = cancel&quit

// git merge must be followed by git push to update origin
// git merge is always theirs-into-ours
// git rebase is always ours-into-theirs

<<<<<<<<<<<< HEAD
the cake is a lie                    // our version
==========
the cake is telling the truth!       // their version
>>>>>>>>>>
4e76d53546f

git checkout --theirs <file>         // marks as resolved using theirs
git checkout --ours <file>           // marks as resolved using mine
git add conflicted.txt               // marks as resolved
git branch -r                        // lists all remote branches

git remote show origin               // shows all remote branches and tracked branches
git push origin :cart                // removes remote branch
git remote prune origin              // cleans up deleted remote branches

## rebase
// Merge commits are bad!!
git rebase master                    // rebases master to <branch>
// 1) move all changes to master which are not in origin/master into temp area
// 2) run all origin/master commits
// 3) run all commits in the temp area
// 4) final step: you have to go to master and merge from rebased <branch>

git rebase                           // moves local commit after the last fetched one
git rebase --continue                // continues in rebase
git rebase --abort                   // aborts the rebase
git pull --rebase                    // pulls using rebase, avoids merging tracking branch

// ordinary git pull creates a commit - git downloads the other developers commit and
// then merges it into your local branch

git rebase -i HEAD~3                 // interactive rebase of 3 alter commits
// can be used to reorder commits (A->B instead of B->A), just swap the order in editor

Interactive rebase commands:
p (pick) - use commit
r (reword) - use commit and edit the message
e (edit) - use commit, but meld into previous commit
f (fixup) - like squash, but discards log message
x (exec) - run command using shell

example: reword 9afe987 This is a new commit message

## split commit into two commits
git rebase -i HEAD~3
edit 39b23ce Split commit message    // go to comnit A
git reset HEAD^                      // reset to commit (A-1)
git add myFiles
git commit -m "New commit"
git rebase --continue

## squash two commits into one commit
git rebase -i HEAD~4
squash e800564 Most recent commit
-- write commit message

## log
git config --global color-ui true    // colors the log
git log --pretty=oneline             // display log in one line
git log --oneline                    // the same
git log --pretty=format:"%h %ad- %s [%an]"
// %ad = author date
// %an = author name
// %h  = SHA hash
// %s  = subject
// %d  = ref names

git log -p                            // displays log with diff
git blame index.html --date short     // displays blame of one file

## untracking
// .git/info/exclude                  // list of locally excluded files
// .gitignore                         // list of globally excluded files

// untracking file
1) git rm --cached file.txt
2) update gitignore, add file.txt


## bare
// how to create a bare repository from local repository
   $ mv myRepo/.git myRepo.git 
   $ git --git-dir=myRepo.git config core.bare true
   $ rm -rf myRepo


## stash
git stash save                        // saves modified file
git stash                             // the same
git stash apply                       // bring stashed files back
git stash apply stash@{1}             // applies stash@{1}
git stash pop                         // apply + drop
git stash list                        // displays all stashes
git stash drop                        // drops the stash
git stash save --keep-index           // staging area wont be stashed
git stash save --include-untracked    // stash including untracked files
git stash clear                       // deletes all stashes
git checkout stash -- .               // replaces all stashed files

## line endings
Linux, OSX: LF (LineFeed)
Windows: CR (Carriage Return) and LF pair

git config --global core.autocrlf true      // changes LF to CRLF (for Windows)
git config --global core.autocrlf input     // for unix
.gitattributes                              // local settings in the repo root

## attribute settings:
* text=auto         - auto-convert line endings
*.html text         - treat html and css files as text (convert to OS on checkout)
*.jpg binary        - teat image files as binary
*.sh text eol=lf    - keep shell scripts in unix format
*.bat text eol=crlf - batch files in windows format

## cherrypick
git cherry-pick <commit-hash>                   // applies one commit to current branch
git cherry-pick --edit 5321                     // cherry-pick that edits the commit msg
git cherry-pick --no-commit <commitA> <commitB> // cherry-pick that doesnt make new commit (copy-paste)

## patch
### a good solution if we only want to takes changes from another part of the working tree
git diff HEAD <commit> | git apply
### now we need to recover from a detached HEAD
git checkout -b temp
git checkout -B master temp
git branch -D temp

## lost data
### git never deletes a commit
git reflog                  // displays log that contains deleted commits
git reset --hard 1e654v     // resets to lost commit
git log --walk-reflog       // displays more information from reflog
git branch myBranch 2984g   // restores deleted branch

## local ignore
ignore=update-index --assume-unchanged
unignore=update-index --no-assume-unchanged
ignored=!git ls-files -v | grep "^[[:lower:]]"
// now you may write "git ignore myFile" and "git unignore myFile"

## creating a commit with a custom date
GIT_AUTHOR_DATE='15 Apr 2018 16:15' GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE" git commit -m '<message>'

## git alias for pretty-formatted log
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
and then we can write git lg
```