export const en = {
  nav: {
    title: 'ML/DL Simulator',
    home: 'Home',
    theme: 'Theme',
    language: 'Language',
  },
  home: {
    title: 'Choose a Model to Simulate',
    subtitle: 'Explore machine learning and deep learning models step by step',
    filterAll: 'All',
    filterML: 'Classic ML',
    filterDL: 'Deep Learning',
    filterNLP: 'NLP',
    simulate: 'Simulate',
    comingSoon: 'Coming Soon',
  },
  models: {
    ann: { name: 'ANN / MLP', shortDesc: 'Multi-layer perceptron with forward and backward propagation', category: 'Deep Learning' },
    cnn: { name: 'CNN', shortDesc: 'Convolutional neural network for image processing', category: 'Deep Learning' },
    rnn: { name: 'RNN', shortDesc: 'Recurrent neural network for sequential data', category: 'Deep Learning' },
    lstm: { name: 'LSTM', shortDesc: 'Long short-term memory network with gate mechanisms', category: 'Deep Learning' },
    gru: { name: 'GRU', shortDesc: 'Gated recurrent unit — simplified LSTM variant', category: 'Deep Learning' },
    transformer: { name: 'Transformer', shortDesc: 'Self-attention mechanism and positional encoding', category: 'Deep Learning' },
    linearRegression: { name: 'Linear Regression', shortDesc: 'Predicting continuous values with a linear model', category: 'Classic ML' },
    logisticRegression: { name: 'Logistic Regression', shortDesc: 'Binary classification with sigmoid function', category: 'Classic ML' },
    decisionTree: { name: 'Decision Tree', shortDesc: 'Tree-based classification with Gini/Entropy splits', category: 'Classic ML' },
    randomForest: { name: 'Random Forest', shortDesc: 'Ensemble of decision trees with bagging', category: 'Classic ML' },
    svm: { name: 'SVM', shortDesc: 'Support vector machine with margin maximization', category: 'Classic ML' },
    knn: { name: 'KNN', shortDesc: 'K-nearest neighbors classification', category: 'Classic ML' },
    xgboost: { name: 'XGBoost', shortDesc: 'Gradient boosting with sequential error correction', category: 'Classic ML' },
    nlpPipeline: { name: 'NLP Pipeline', shortDesc: 'Tokenization, embedding and encoding pipeline', category: 'NLP' },
  },
  simulator: {
    controls: {
      prev: 'Previous',
      next: 'Next',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      speed: 'Speed',
      step: 'Step',
      of: 'of',
      epoch: 'Epoch',
    },
    depth: {
      intuitive: 'Intuitive',
      technical: 'Technical',
    },
    panels: {
      parameters: 'Parameters',
      info: 'Step Details',
      network: 'Neural Network',
      decisionBoundary: 'Decision Boundary',
      lossChart: 'Loss Chart',
    },
  },
  ann: {
    params: {
      layers: 'Network Layers',
      learningRate: 'Learning Rate',
      activation: 'Activation Function',
      epochs: 'Epochs',
      dataset: 'Dataset',
      preset: 'Preset',
    },
    datasets: {
      xor: 'XOR Problem',
      and: 'AND Gate',
      or: 'OR Gate',
      circle: 'Circle Classification',
    },
    presets: {
      xorSimple: 'XOR - Simple',
      xorDeep: 'XOR - Deep',
      circle: 'Circle Classification',
    },
    steps: {
      input: {
        title: 'Input',
        description: 'Feed the input data into the network. Each input neuron receives one feature value.',
        technical: 'Input vector x = [x₁, x₂, ..., xₙ] is loaded into the input layer neurons. No transformation occurs at this stage.',
      },
      forwardZ: {
        title: 'Weighted Sum (z)',
        description: 'Each neuron multiplies its inputs by the connection weights, adds them up, and adds the bias. This is like a "vote" weighted by importance.',
        technical: 'z = W · a_prev + b where W is the weight matrix, a_prev is the previous layer activation, and b is the bias vector.',
      },
      forwardA: {
        title: 'Activation (a)',
        description: 'The activation function decides how "active" each neuron should be. It squishes the weighted sum into a useful range.',
        technical: 'a = f(z) where f is the activation function (sigmoid, ReLU, tanh). This introduces non-linearity into the network.',
      },
      loss: {
        title: 'Calculate Loss',
        description: 'We measure how far the prediction is from the correct answer. A lower loss means a better prediction.',
        technical: 'L = (1/n) Σ(yᵢ - ŷᵢ)² (MSE) where y is the target and ŷ is the prediction. The loss gradient is ∂L/∂ŷ = (2/n)(ŷ - y).',
      },
      backward: {
        title: 'Backpropagation',
        description: 'The error flows backward through the network. Each neuron learns how much it contributed to the mistake.',
        technical: 'δₗ = (Wₗ₊₁ᵀ · δₗ₊₁) ⊙ f\'(zₗ) — The delta for each layer is computed using the chain rule, propagating gradients from output to input.',
      },
      update: {
        title: 'Update Weights',
        description: 'Weights are adjusted slightly in the direction that reduces the error. This is learning!',
        technical: 'W ← W - η · ∂L/∂W where η is the learning rate. ∂L/∂W = δ · aₗ₋₁ᵀ is the outer product of delta and previous activations.',
      },
    },
  },
  help: {
    preset: {
      title: 'Preset',
      content: 'A preset is a ready-made configuration. Instead of setting every parameter yourself, pick a preset and the network architecture, learning rate, and dataset are set automatically. Great for quick experimentation!',
    },
    layers: {
      title: 'Network Layers',
      content: 'Shows how many neurons are in each layer of the network. For example [2 → 4 → 1] means: 2 input neurons, 4 neurons in the hidden layer, 1 output neuron. More neurons = more capacity to learn complex patterns, but also slower.',
    },
    activation: {
      title: 'Activation Function',
      content: 'Activation functions determine what signal a neuron sends forward. Without them, the network could only learn straight lines. Sigmoid outputs 0-1 (good for probabilities), ReLU passes positive values as-is (fast training), Tanh outputs -1 to 1.',
    },
    learningRate: {
      title: 'Learning Rate',
      content: 'Controls how big each learning step is. Too high = the network overshoots and never converges. Too low = learning is painfully slow. Typical values: 0.001 to 0.5. Think of it like the step size when walking downhill — too large and you jump over the valley.',
    },
    epochs: {
      title: 'Epochs',
      content: 'One epoch = the network sees all training data once. More epochs = more practice. Like studying for an exam — going through the material multiple times helps, but too many times and you might memorize rather than understand (overfitting).',
    },
    dataset: {
      title: 'Dataset',
      content: 'The training data the network learns from. XOR is a classic problem where a simple line can\'t separate the classes — the network must learn a non-linear boundary. Circle is similar but with more data points arranged in circles.',
    },
    network: {
      title: 'Neural Network',
      content: 'This diagram shows the network\'s structure. Circles are neurons, lines are connections (weights). Colors show activation values: green = positive/active, red = negative. Line thickness shows weight magnitude. Pulsing neurons are being processed in the current step.',
    },
    decisionBoundary: {
      title: 'Decision Boundary',
      content: 'This heatmap shows how the network classifies every possible point in 2D space. Green regions = class 1, red regions = class 0. The colored dots are actual training data. Watch how the boundary changes as the network learns!',
    },
    lossChart: {
      title: 'Loss Chart',
      content: 'Loss measures prediction error — lower is better. This chart shows how loss decreases over training epochs. A smoothly decreasing curve = healthy learning. If it plateaus, the network might be stuck. If it goes up, the learning rate might be too high.',
    },
    stepControls: {
      title: 'Step Controls',
      content: 'Navigate through the simulation step by step, or hit play for automatic progression. Each step shows one operation: feeding input, computing weighted sums, applying activation, calculating error, propagating gradients, or updating weights.',
    },
    depthToggle: {
      title: 'Intuitive / Technical Mode',
      content: 'Switch between two explanation styles. Intuitive mode uses simple language and analogies — perfect for beginners. Technical mode shows the actual math formulas and precise notation — great for students and practitioners.',
    },
    stepInfo: {
      title: 'Step Details',
      content: 'This panel explains what is happening at the current step. It shows the description, formula, and numerical values being computed. Switch between Intuitive and Technical modes to change the level of detail.',
    },
  },
}

export type Translations = typeof en
