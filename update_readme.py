import os
import requests

START = "<!--START_REPOS-->"
END = "<!--END_REPOS-->"

def fetch_repos(token=None):
    headers = {}
    login = os.getenv("GITHUB_USER")
    if token:
        headers["Authorization"] = f"token {token}"
        user = requests.get("https://api.github.com/user", headers=headers)
        user.raise_for_status()
        login = user.json()["login"]
    elif not login:
        raise SystemExit("GITHUB_USER environment variable required when no token provided")

    repos = []
    page = 1
    while True:
        r = requests.get(f"https://api.github.com/users/{login}/repos", headers=headers, params={"per_page": 100, "page": page, "sort": "updated"})
        r.raise_for_status()
        data = r.json()
        if not data:
            break
        repos.extend([repo for repo in data if not repo.get("fork")])
        page += 1
    return login, repos


def format_repo_list(repos):
    lines = [f"- [{repo['name']}]({repo['html_url']})" for repo in repos]
    return "\n".join(lines)


def update_readme(repo_lines):
    with open("README.md", "r", encoding="utf-8") as f:
        content = f.read()
    if START not in content or END not in content:
        raise ValueError("README missing repo markers")
    pre, rest = content.split(START, 1)
    _, post = rest.split(END, 1)
    new_content = pre + START + "\n" + repo_lines + "\n" + END + post
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(new_content)


def main():
    token = os.getenv('GITHUB_TOKEN')
    _, repos = fetch_repos(token)
    repo_lines = format_repo_list(repos)
    update_readme(repo_lines)


if __name__ == "__main__":
    main()
