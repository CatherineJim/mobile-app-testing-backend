const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const sendEmail = require("../util/email");
const App = require("./../model/appModel");

// Create a new app
exports.createApp = catchAsync(async (req, res, next) => {
  const newApp = await App.create(req.body);

  try {
    // Add any additional logic here if needed
    res.status(200).json({
      status: "ok",
      data: {
        newApp,
      },
    });
  } catch (error) {
    return next(new AppError("There's a problem creating the app", 500));
  }
});

// Get all apps
exports.getAllApps = catchAsync(async (req, res, next) => {
  try {
    const apps = await App.find();
    res.status(200).json({
      status: "ok",
      data: {
        apps,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get one app by ID
exports.getAppById = catchAsync(async (req, res, next) => {
  try {
    const app = await App.findById(req.params.id);

    if (!app) {
      return next(new AppError("App not found", 404));
    }

    res.status(200).json({
      status: "ok",
      data: {
        app,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an app by ID
exports.updateApp = catchAsync(async (req, res, next) => {
  try {
    const updatedApp = await App.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedApp) {
      return next(new AppError("App not found", 404));
    }

    res.status(200).json({
      status: "ok",
      data: {
        app: updatedApp,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an app by ID
exports.deleteApp = catchAsync(async (req, res, next) => {
  try {
    const deletedApp = await App.findByIdAndDelete(req.params.id);

    if (!deletedApp) {
      return next(new AppError("App not found", 404));
    }

    res.status(200).json({
      status: "ok",
      data: {
        app: deletedApp,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
