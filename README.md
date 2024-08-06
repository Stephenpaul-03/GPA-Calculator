# GPA Calculator

## Description

A web application designed to calculate your GPA or CGPA on a 10-point scale. This tool allows you to input subject names, credits, and grades to generate a detailed breakdown of your academic performance. It dynamically handles multiple subjects, provides error checking for invalid inputs, and displays a comprehensive result table.

## Features

- **Dynamic Subject Rows:** Add or remove subject rows as needed.
- **Validation:** Checks for empty or invalid inputs and provides user-friendly error messages.
- **GPA Calculation:** Calculates GPA/CGPA based on the 10-point scale.
- **Detailed Breakdown:** Displays a table with subject details, credits, grades, and calculated scores.
- **Responsive Design:** Optimized for various screen sizes and devices.

## Score Breakdown

The following scale is used to convert grades into numerical scores:

| Grade | Score |
|-------|-------|
| O     | 10    |
| A+    | 9     |
| A     | 8     |
| B+    | 7     |
| B     | 6     |
| C+    | 5     |
| C     | 4     |

## Installation

To set up the GPA Calculator on your local machine, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/stephenpaul-03/gpa-calculator.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd gpa-calculator
    ```

3. **Open `index.html` in Your Browser:**

    You can open `index.html` directly in your browser to start using the application.

## Usage

1. **Input Subjects:** Enter the name, credits, and grade for each subject. You can add more subjects or remove existing ones using the provided buttons.
2. **Calculate GPA:** Click on the "Calculate GPA/CGPA" button to compute your GPA or CGPA. The result will be displayed in a table format.
3. **Review Results:** The application will show a detailed breakdown of your subjects, credits, grades, and the computed GPA/CGPA.

## Code Overview

- **HTML (`index.html`):** The main structure of the application, including input fields for subjects, credits, and grades.
- **CSS (`styles.css`):** Styles the application to ensure a user-friendly interface.
- **JavaScript (`script.js`):** Handles the dynamic addition and removal of subjects, validation, and GPA calculation.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Fonts](https://fonts.google.com/) for web fonts
