import Scenario from '../models/Scenario.js';
import { simulateScenario } from '../utils/aiService.js';
import { protect } from '../auth/middleware/auth.js';

export const createSimulation = async (req, res) => {
  try {
    console.log('Received simulation request:', JSON.stringify(req.body, null, 2));

    // Validate required fields
    const { title, budget, location, timeline, description } = req.body;
    if (!title || !budget || !location || !timeline || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: title, budget, location, timeline, and description'
      });
    }

    // Create scenario object with user reference
    const scenario = new Scenario({
      user: req.user._id,
      title,
      budget: Number(budget),
      location,
      timeline,
      description
    });

    console.log('Created scenario object:', JSON.stringify(scenario.toObject(), null, 2));

    // Save to database
    const savedScenario = await scenario.save();
    console.log('Scenario saved to database:', JSON.stringify(savedScenario.toObject(), null, 2));

    // Run AI simulation
    console.log('Starting AI simulation');
    const simulation = await simulateScenario(scenario);
    console.log('Simulation result:', JSON.stringify(simulation, null, 2));

    if (simulation) {
      if (process.env.NODE_ENV === 'development') console.log('Saving scenario:', scenario);
      // Update the existing scenario with the full simulation result
      savedScenario.simulation = simulation;
      const updatedScenario = await savedScenario.save();
      if (process.env.NODE_ENV === 'development') console.log('Updated scenario with simulation:', updatedScenario);
    }

    res.status(200).json({
      success: true,
      data: {
        scenario: savedScenario,
        simulation
      }
    });
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process simulation'
    });
  }
};

export const getAllScenarios = async (req, res) => {
  try {
    // Only get scenarios for the current user
    const scenarios = await Scenario.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log('Retrieved scenarios:', JSON.stringify(scenarios, null, 2));
    
    res.status(200).json({
      success: true,
      data: scenarios
    });
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scenarios'
    });
  }
};

export const deleteScenario = async (req, res) => {
  try {
    const scenario = await Scenario.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!scenario) {
      return res.status(404).json({
        success: false,
        error: 'Scenario not found or not authorized'
      });
    }

    await scenario.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Scenario deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting scenario:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete scenario'
    });
  }
}; 