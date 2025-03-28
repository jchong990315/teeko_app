import random
import copy

class TeekoPlayer:
    """ An AI player for the game Teeko. """
    board = [[' ' for j in range(5)] for i in range(5)]
    pieces = ['b', 'r']

    def __init__(self):
        self.my_piece = random.choice(self.pieces)
        self.opp = self.pieces[0] if self.my_piece == self.pieces[1] else self.pieces[1]

    def make_move(self, state):
        drop_phase = sum(row.count(self.my_piece) + row.count(self.opp) for row in state) < 8
        if drop_phase:
            move = self.minimax_decision(state, depth=2, drop_phase=True)
            return [move]
        else:
            move = self.minimax_decision(state, depth=2, drop_phase=False)
            return [move[0], move[1]]

    def minimax_decision(self, state, depth, drop_phase):
        best_score = float('-inf')
        best_move = None
        for move in self.succ(state, drop_phase):
            new_state = self.result(state, move, drop_phase)
            score = self.min_value(new_state, depth - 1)
            if score > best_score:
                best_score = score
                best_move = move
        return best_move

    def max_value(self, state, depth):
        if self.terminal_test(state) or depth == 0:
            return self.heuristic_game_value(state)
        v = float('-inf')
        for move in self.succ(state, drop_phase=False):
            v = max(v, self.min_value(self.result(state, move, drop_phase=False), depth - 1))
        return v

    def min_value(self, state, depth):
        if self.terminal_test(state) or depth == 0:
            return self.heuristic_game_value(state)
        v = float('inf')
        for move in self.succ(state, drop_phase=False):
            v = min(v, self.max_value(self.result(state, move, drop_phase=False), depth - 1))
        return v

    def succ(self, state, drop_phase):
        successors = []
        if drop_phase:
            for row in range(5):
                for col in range(5):
                    if state[row][col] == ' ':
                        successors.append((row, col))
        else:
            for row in range(5):
                for col in range(5):
                    if state[row][col] == self.my_piece:
                        for r in range(max(0, row - 1), min(5, row + 2)):
                            for c in range(max(0, col - 1), min(5, col + 2)):
                                if state[r][c] == ' ':
                                    successors.append(((r, c), (row, col)))
        return successors

    def result(self, state, move, drop_phase):
        new_state = copy.deepcopy(state)
        if drop_phase:
            new_state[move[0]][move[1]] = self.my_piece
        else:
            new_state[move[0][0]][move[0][1]] = self.my_piece
            new_state[move[1][0]][move[1][1]] = ' '
        return new_state

    def heuristic_game_value(self, state):
        if self.game_value(state) == 1:
            return 1
        elif self.game_value(state) == -1:
            return -1
        score = 0
        for row in state:
            score += row.count(self.my_piece) - row.count(self.opp)
        return score / 100.0

    def terminal_test(self, state):
        return self.game_value(state) != 0

    def place_piece(self, move, piece):
        if len(move) > 1:
            self.board[move[1][0]][move[1][1]] = ' '
        self.board[move[0][0]][move[0][1]] = piece

    def game_value(self, state):
        for row in state:
            for i in range(2):
                if row[i] != ' ' and row[i] == row[i+1] == row[i+2] == row[i+3]:
                    return 1 if row[i]==self.my_piece else -1
        for col in range(5):
            for i in range(2):
                if state[i][col] != ' ' and state[i][col] == state[i+1][col] == state[i+2][col] == state[i+3][col]:
                    return 1 if state[i][col]==self.my_piece else -1
        for i in range(2):
            for j in range(2):
                if state[i][j] != ' ' and state[i][j] == state[i + 1][j + 1] == state[i + 2][j + 2] == state[i + 3][j + 3]:
                    return 1 if state[i][j] == self.my_piece else -1
        for i in range(2):
            for j in range(3, 5):
                if state[i][j] != ' ' and state[i][j] == state[i + 1][j - 1] == state[i + 2][j - 2] == state[i + 3][j - 3]:
                    return 1 if state[i][j] == self.my_piece else -1
        for i in range(4):
            for j in range(4):
                if state[i][j] != ' ' and state[i][j] == state[i][j + 1] == state[i + 1][j] == state[i + 1][j + 1]:
                    return 1 if state[i][j] == self.my_piece else -1
        return 0
