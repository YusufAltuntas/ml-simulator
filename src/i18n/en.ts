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
      play: 'Auto-play',
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
      network: 'Network',
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
}

export type Translations = typeof en
