---
title: Git
---

```bash
git help                             // nápověda
git help config                      // možné příkazy pro config

## konfigurace
git config --list                    // zobrazí všechny konfigurace
git config --global user.name "Me"   // globálně nastaví uživatelské jméno
git config user.name "Me"            // lokálně nastaví uživatelské jméno
git config --global alias.st status  // nastaví alias pro status (lze pak psát git st)

## základy
git init                             // inicializuje prázdný Git repozitář
git add README.txt                   // přidá soubor do oblasti připravených změn
git rm README.txt                    // odstraní readme.txt
git rm --cached README.txt           // odebere soubor z oblasti připravených změn
git reset README.txt                 // odebere soubor z oblasti připravených změn
git commit -m "Create a README"      // vytvoří commit
git add --all                        // přidá vše do oblasti připravených změn
git add FILE1.TXT FILE2.TXT          // přidá více souborů do oblasti připravených změn
git add docs/*.txt                   // přidá soubory docs/*.txt
git add docs/                        // přidá všechny soubory v adresáři docs
git log                              // zobrazí poslední commity
git clone --recursively <path>       // klonuje repozitář rekurzivně

## diff
git diff                             // zobrazí rozdíly
git diff --staged                    // zobrazí připravené rozdíly
git diff HEAD                        // diff od posledního commitu
git diff HEAD^                       // diff od rodiče posledního commitu
git diff f5acd..f656a                // diff mezi commity X a Y
git diff master bird                 // diff mezi větvemi X a Y

## reset
git checkout -- .                    // zruší všechny změny od posledního commitu
git checkout -- readme.txt           // zruší všechny změny pro jeden soubor
git commit -a -m "Modify Readme"     // připraví a commitne změny
git reset --soft HEAD^               // resetuje do oblasti připravených změn (^ je pro JEDEN commit před head)
git commit --amend -m "Modified XX"  // přidá k poslednímu commitu, lze zadat novou zprávu commitu
git checkout 0156fsc                 // přejde na commit 0156fsc
git checkout 0156fsc~1 -- fileX      // vezme fileX z jednoho commitu PŘED 0156fsc (dobré pro revert)
git reset --hard HEAD                // vrátí všechny změny
git reset --hard HEAD^               // vrátí poslední commit a všechny změny
git reset --hard HEAD^^              // vrátí poslední 2 commity a všechny změny
git reset --hard HEAD@{30}           // vrátí posledních 30 commitů (použitelné pro zlomený rebase)
// SOFT = zničí commity, ale zachová připravené změny
// HARD = smaže commity a všechny změny
git revert --no-commit <commit>      // vrátí všechny změny z <commit>, i když je to dávno
git clean -f                         // odstraní nežádoucí soubory z pracovního adresáře

## vzdálený repozitář
git remote add origin <url>          // přidá nový vzdálený repozitář a pojmenuje ho "origin"

git push -u <name> <branch>           // pushne do vzdáleného (-u uloží jméno a větev pro příští použití)
git push -u origin master             // pushne do origin/master
git push origin branch1:branch2       // pushne větev s novými změnami (branch1) do jiné větve (branch2)
git remote -v                         // zobrazí všechny vzdálené repozitáře, verbose možnost
git remote rm <name>                  // odstraní vzdálený repozitář

git pull                              // stáhne změny ze vzdáleného repozitáře (git fetch + git merge origin/<branch>)
git fetch                             // pouze aktualizuje repozitář 

## tagy
// tag je odkaz na commit (používá se pro verzování vydání)
git tag                               // zobrazí všechny tagy
git checkout v1.0                     // přejde na tag (-f možnost vynutí revert)
git tag -a v0.3 -m "version 0.3"      // vytvoří nový tag
git push --tags                       // pushne tagy na server

## větve
git clone <url> <folder>              // klonuje repozitář do <folder>
git branch cat                        // vytvoří větev CAT
git checkout cat                      // přejde na větev cat
git checkout -b admin                 // vytvoří a přejde na větev admin
git merge cat                         // sloučí cat do <aktuální větve>
git branch -d cat                     // odstraní větev cat
git branch -D cat                     // vynuceně odstraní větev
git push origin --delete <branch>     // odstraní vzdálenou větev
git branch                            // zobrazí název aktuální větve
git switch cat                        // stejné jako git checkout cat
git switch -                          // přepne na větev, ze které jsme přišli

## merge
// git používá VI, pokud není nastaven výchozí editor
// j = dolů, k = nahoru, h = vlevo, l = vpravo, esc = opustit mód, :wq = uložit&ukončit
// i = mód vkládání, :q! = zrušit&ukončit

// git merge musí být následován git push pro aktualizaci origin
// git merge je vždy jejich-do-našich
// git rebase je vždy naše-do-jejich

<<<<<<<<<<<< HEAD
the cake is a lie                    // naše verze
==========
the cake is telling the truth!       // jejich verze
>>>>>>>>>>
4e76d53546f

git checkout --theirs <file>         // označí jako vyřešené pomocí jejich verze
git checkout --ours <file>           // označí jako vyřešené pomocí mé verze
git add conflicted.txt               // označí jako vyřešené
git branch -r                        // vypíše všechny vzdálené větve

git remote show origin               // zobrazí všechny vzdálené větve a sledované větve
git push origin :cart                // odstraní vzdálenou větev
git remote prune origin              // vyčistí smazané vzdálené větve

## rebase
// Merge commity jsou špatné!!
git rebase master                    // rebasuje master do <větve>
// 1) přesune všechny změny do master, které nejsou v origin/master, do dočasné oblasti
// 2) spustí všechny commity origin/master
// 3) spustí všechny commity v dočasné oblasti
// 4) závěrečný krok: musíte přejít na master a sloučit z rebasované <větve>

git rebase                           // přesune lokální commit za poslední fetchnutý
git rebase --continue                // pokračuje v rebase
git rebase --abort                   // zruší rebase
git pull --rebase                    // stáhne pomocí rebase, vyhne se mergování sledované větve

// běžný git pull vytvoří commit - git stáhne commit ostatních vývojářů a
// poté ho sloučí do vaší lokální větve

git rebase -i HEAD~3                 // interaktivní rebase 3 posledních commitů
// lze použít k přeuspořádání commitů (A->B místo B->A), stačí prohodit pořadí v editoru

Příkazy interaktivního rebase:
p (pick) - použít commit
r (reword) - použít commit a upravit zprávu
e (edit) - použít commit, ale sloučit s předchozím commitem
f (fixup) - jako squash, ale zahodí zprávu logu
x (exec) - spustit příkaz pomocí shellu

příklad: reword 9afe987 Toto je nová zpráva commitu

## rozdělení commitu na dva commity
git rebase -i HEAD~3
edit 39b23ce Split commit message    // přejít na commit A
git reset HEAD^                      // resetovat na commit (A-1)
git add myFiles
git commit -m "New commit"
git rebase --continue

## sloučení dvou commitů do jednoho
git rebase -i HEAD~4
squash e800564 Most recent commit
-- zapsat zprávu commitu

## log
git config --global color-ui true    // obarví log
git log --pretty=oneline             // zobrazí log na jednom řádku
git log --oneline                    // stejné
git log --pretty=format:"%h %ad- %s [%an]"
// %ad = datum autora
// %an = jméno autora
// %h  = SHA hash
// %s  = předmět
// %d  = ref jména

git log -p                            // zobrazí log s diffem
git blame index.html --date short     // zobrazí blame jednoho souboru

## sledování
// .git/info/exclude                  // seznam lokálně vyloučených souborů
// .gitignore                         // seznam globálně vyloučených souborů

// zrušení sledování souboru
1) git rm --cached file.txt
2) aktualizujte gitignore, přidejte file.txt


## bare
// jak vytvořit bare repozitář z lokálního repozitáře
   $ mv myRepo/.git myRepo.git 
   $ git --git-dir=myRepo.git config core.bare true
   $ rm -rf myRepo


## stash
git stash save                        // uloží modifikované soubory
git stash                             // stejné
git stash apply                       // obnoví stashnité soubory
git stash apply stash@{1}             // aplikuje stash@{1}
git stash pop                         // apply + drop
git stash list                        // zobrazí všechny stashe
git stash drop                        // zahodí stash
git stash save --keep-index           // oblast připravených změn nebude stashnuta
git stash save --include-untracked    // stash včetně nesledovaných souborů
git stash clear                       // smaže všechny stashe
git checkout stash -- .               // nahradí všechny stashnité soubory

## konce řádků
Linux, OSX: LF (LineFeed)
Windows: CR (Carriage Return) a LF pár

git config --global core.autocrlf true      // změní LF na CRLF (pro Windows)
git config --global core.autocrlf input     // pro unix
.gitattributes                              // lokální nastavení v kořeni repozitáře

## nastavení atributů:
* text=auto         - automatická konverze konců řádků
*.html text         - zacházet s html a css soubory jako s textem (konverze na OS při checkout)
*.jpg binary        - zacházet s obrázky jako s binárními soubory
*.sh text eol=lf    - udržovat shell skripty ve unixovém formátu
*.bat text eol=crlf - batch soubory ve windows formátu

## cherrypick
git cherry-pick <commit-hash>                   // aplikuje jeden commit na aktuální větev
git cherry-pick --edit 5321                     // cherry-pick s úpravou zprávy commitu
git cherry-pick --no-commit <commitA> <commitB> // cherry-pick bez vytvoření nového commitu (copy-paste)

## patch
### dobré řešení, pokud chceme vzít změny pouze z jiné části pracovního stromu
git diff HEAD <commit> | git apply
### nyní je třeba se zotavit z odpojeného HEAD
git checkout -b temp
git checkout -B master temp
git branch -D temp

## ztracená data
### git nikdy nesmaže commit
git reflog                  // zobrazí log obsahující smazané commity
git reset --hard 1e654v     // resetuje na ztracený commit
git log --walk-reflog       // zobrazí více informací z reflogu
git branch myBranch 2984g   // obnoví smazanou větev

## lokální ignorování
ignore=update-index --assume-unchanged
unignore=update-index --no-assume-unchanged
ignored=!git ls-files -v | grep "^[[:lower:]]"
// nyní lze psát "git ignore myFile" a "git unignore myFile"

## vytvoření commitu s vlastním datem
GIT_AUTHOR_DATE='15 Apr 2018 16:15' GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE" git commit -m '<message>'

## git alias pro pěkně formátovaný log
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
a pak lze psát git lg
```
