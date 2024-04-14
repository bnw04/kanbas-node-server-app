import * as dao from "./dao.js";

export default function ModuleRoutes(app) {

  const createModule = async (req, res) => {
    try {
      const { courseId } = req.params;
      const newModule = {
        ...req.body,
        course: courseId
      };
      const module = await dao.createModule(newModule);
      res.json(module);
    } catch (error) {
      res.status(400).send('Module Name is required.');
    }
  };

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  };

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const newModule = req.body
    try {
      if (!newModule.name || newModule.name.trim() === "") {
        throw new Error("Module Name is required.");
      }
      const status = await dao.updateModule(moduleId, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    } 
  };

  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
    return;
  };

  const findModuleById = async (req, res) => {
    const { moduleId } = req.params;
    const module = await dao.findModuleById(moduleId);
    res.json(module);
  };

  app.post("/api/courses/:courseId/modules", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
  app.get("/api/modules/:moduleId", findModuleById);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}
