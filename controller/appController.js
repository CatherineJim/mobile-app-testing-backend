const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const App = require("./../model/appModel");
const btoa = require("btoa");
const { default: axios } = require("axios");

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

// Controller function to create an app
exports.uploadApp = async (req, res) => {
  const { fileUrl, platform } = req.body;
  const apiToken = process.env.APPETIZE_API_TOKEN; // Replace with your actual API token

  const options = {
    url: "https://api.appetize.io/v1/apps",
    json: {
      url: fileUrl,
      platform: platform,
    },
    headers: {
      Authorization: "Basic " + btoa(apiToken + ":"),
    },
  };

  axios.post(options, async (err, response, body) => {
    if (err) {
      // Connection error
      console.log("Error", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else if (response.statusCode !== 200) {
      // API returned error
      console.log("API error", body);
      return res
        .status(response.statusCode)
        .json({ error: "API Error", details: body });
    } else {
      // Success - Save the app details to your database (Assuming Mongoose for MongoDB)
      try {
        const appDetails = {
          name: body.name,
          platform: body.platform,
        };
        res.status(201).json({
          status: "ok",
          data: {
            app: appDetails,
          },
        });
      } catch (saveError) {
        console.error("Error saving app to the database", saveError);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
};

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
