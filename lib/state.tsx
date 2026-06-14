"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { FLOW } from "./flow";
import type { Answers, StepId } from "./types";

interface State {
  index: number;
  answers: Answers;
}

type Action =
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "GOTO"; step: StepId }
  | { type: "SET_ANSWER"; patch: Partial<Answers> }
  | { type: "RESET" };

const initialState: State = { index: 0, answers: {} };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT":
      return { ...state, index: Math.min(state.index + 1, FLOW.length - 1) };
    case "BACK":
      return { ...state, index: Math.max(state.index - 1, 0) };
    case "GOTO": {
      const i = FLOW.indexOf(action.step);
      return i === -1 ? state : { ...state, index: i };
    }
    case "SET_ANSWER":
      return { ...state, answers: { ...state.answers, ...action.patch } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface FlowContextValue {
  step: StepId;
  index: number;
  total: number;
  /** 0..1, for the cosmetic progress bar. */
  progress: number;
  answers: Answers;
  next: () => void;
  back: () => void;
  goTo: (step: StepId) => void;
  setAnswer: (patch: Partial<Answers>) => void;
  reset: () => void;
}

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<FlowContextValue>(() => {
    const total = FLOW.length;
    return {
      step: FLOW[state.index],
      index: state.index,
      total,
      progress: total <= 1 ? 1 : state.index / (total - 1),
      answers: state.answers,
      next: () => dispatch({ type: "NEXT" }),
      back: () => dispatch({ type: "BACK" }),
      goTo: (step: StepId) => dispatch({ type: "GOTO", step }),
      setAnswer: (patch: Partial<Answers>) =>
        dispatch({ type: "SET_ANSWER", patch }),
      reset: () => dispatch({ type: "RESET" }),
    };
  }, [state]);

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow(): FlowContextValue {
  const ctx = useContext(FlowContext);
  if (!ctx) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return ctx;
}
