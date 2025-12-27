import Department from "../models/department.model.js";
export const seedDepartments = async (req, res) => {
  try {
    const dummyDepartments = [
      {
        name: "Human Resources",
        description: "Handles recruitment, employee relations, and company policies",
        companyId: {},
        is_active: true,
    },
    {
        name: "Engineering",
        description: "Responsible for product development and system maintenance",
        companyId: "64d800000000000000000001",
        is_active: true,
    },
    {
        name: "Finance",
        description: "Manages budgeting, payroll, and financial planning",
        companyId: "64d800000000000000000001",
        is_active: true,
    },
    {
        name: "Marketing",
        description: "Handles branding, advertising, and customer outreach",
        companyId: "64d800000000000000000001",
        is_active: false,
      }
    ];

    // Optional: clear old data
    // await Department.deleteMany({});

    const departments = await Department.insertMany(dummyDepartments);

    return res.status(201).json({
      success: true,
      message: "Dummy departments inserted successfully",
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    console.error("Seed Departments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to insert dummy departments",
    });
  }
};
