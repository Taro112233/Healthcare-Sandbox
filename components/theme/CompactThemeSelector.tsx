// components/theme/CompactThemeSelector.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";

/**
 * Compact theme selector for the main app header
 * Designed for medical context with professional themes
 */
export function CompactThemeSelector() {
  const {
    currentTheme,
    themes,
    activeTheme,
    isDark,
    isInitialized,
    changeTheme,
    toggleMode,
  } = useTheme();

  if (!isInitialized) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-content-primary hover:bg-surface-interactive relative h-10 w-10 group"
          title="Change Theme"
        >
          <motion.div
            className="relative flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className="w-6 h-6 rounded-lg border-2 border-border-secondary flex items-center justify-center text-sm"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors[0]}, ${currentTheme.colors[1]})`,
              }}
              whileHover={{ scale: 1.1 }}
            >
              {currentTheme.preview}
            </motion.div>
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-brand-primary opacity-60 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 bg-surface-secondary border border-primary"
      >
        <div className="p-3 border-b border-border-secondary">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-5 h-5 rounded-lg border border-border-secondary flex items-center justify-center text-xs"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors[0]}, ${currentTheme.colors[1]})`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {currentTheme.preview}
              </motion.div>
              <div>
                <div className="text-sm font-medium text-content-primary">
                  {currentTheme.name}
                </div>
                <div className="text-xs text-content-secondary">
                  {isDark ? "Dark" : "Light"} Mode
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMode}
              className="h-8 w-8 hover:bg-surface-interactive"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4 w-4 text-blue-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <div className="p-2">
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`
                  relative p-2 rounded-lg border-2 transition-all duration-200 group
                  ${
                    activeTheme === theme.id
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-transparent hover:border-primary hover:bg-surface-interactive"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-8 h-8 rounded-md border border-border-secondary flex items-center justify-center text-lg mx-auto mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                  }}
                >
                  {theme.preview}
                </div>
                <div className="text-xs text-center text-content-secondary group-hover:text-content-primary overflow-hidden text-ellipsis whitespace-nowrap">
                  {theme.name}
                </div>
                {activeTheme === theme.id && (
                  <motion.div
                    className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}