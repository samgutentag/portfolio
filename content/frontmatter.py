import os


def process_mdx_file(filepath):
    with open(filepath, "r") as file:
        lines = file.readlines()

    if len(lines) > 2:
        # Swap the contents of line 2 and line 4
        lines[1], lines[3] = lines[3], lines[1]

        with open(filepath, "w") as file:
            file.writelines(lines)


def process_all_mdx_files():
    cwd = os.getcwd()
    for filename in os.listdir(cwd):
        if filename.endswith(".mdx"):
            process_mdx_file(os.path.join(cwd, filename))


if __name__ == "__main__":
    process_all_mdx_files()
