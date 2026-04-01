# GPA Calculator

## Description

Welcome to **GPA Calculator** – your go-to tool for calculating GPA/CGPA on a 10-point scale. Built using **React + Vite + TypeScript + TailwindCSS + Shad/cn**, making GPA calculation faster and easier with **Excel sheet presets**.

> Quick tip: How to use the calculator and how GPA is calculated? Check the info **on the site, at the top-right (desktop) or bottom-left (mobile) of the calculator**. Super handy if you’re new here.(spotlight guide is cooking up btw)

You can manually input subject names, credits, and grades, or load them instantly using the Excel preset feature. Multiple semesters? No problem. CGPA? Covered.

## How GPA is Calculated

The Tool follows the standard 10-point GPA scale:

| Grade | Score |
| ----- | ----- |
| O     | 10    |
| A+    | 9     |
| A     | 8     |
| B+    | 7     |
| B     | 6     |
| C+    | 5     |
| C     | 4     |

### Calculation Method

1. Multiply the grade score by the subject credit to get the **subject score**.
   *Example: A+ in a 4-credit subject → 4 x 9 = 36.*

2. Add all subject scores together.

3. Divide the total score by the sum of credits:

```
GPA = (Sum of (Grade x Credit)) / (Sum of Credits)
```

Done! You can also calculate **CGPA** across multiple semesters. Easy.

## Clone & Get Started

```bash
# Clone the repo
git clone https://github.com/Stephenpaul-03/GPA-Calculator.git

# Go to the project folder
cd GPA-Calculator

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

### Excel Presets (Recommended)

This version’s Excel feature is a huge time-saver.

1. Open the app.
2. Upload an Excel sheet with `index|semester|subjectcode|subjectname|credits|grade`. (Credits are Required)
3. Pick the semester(s).
4. Subjects and credits populate automatically.
5. Calculate your GPA with one click.

> No Excel sheet? No worries, you can manually enter the details.

### Manual Entry

1. Enter subject names, credits, and grades.
2. Hit calculate.
3. Enjoy your GPA result.

>Note: Only Credits and Grades are required.
If subject names are left empty, a placeholder will be added automatically.

## Export Options

Once your GPA is calculated, you can download it as:

* Excel
* PDF

## Contact

Feedback, bugs, or just saying hi:

* **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/stephen-paul-i/)
* **Gmail**: [stephenpaul4040@gmail.com](mailto:stephenpaul4040@gmail.com)


## License

MIT License. Use freely, just don’t blame me if your GPA suddenly looks too good to be true.
