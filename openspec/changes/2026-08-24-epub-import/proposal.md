# Proposal: EPUB File Import for E-Ink Reader

## Problem Statement
Users want to read their personal digital book collection (.epub files) using the Scandinavian distraction-free e-ink reader rather than being limited to hardcoded classics.

## Proposed Solution
Integrate native file picking (`expo-document-picker`) and a pure-client EPUB parser (`jszip` + XML manifest extractor) that unpacks metadata and chapter contents into the local bookshelf with offline AsyncStorage persistence.
