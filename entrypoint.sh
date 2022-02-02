#!/bin/sh

set -e

if [ -n "$INPUT_COMMAND_STRING" ]; then
  saf $INPUT_COMMAND_STRING
else
  echo "SAF CLI Command String argument is required.";
  exit 1;
fi