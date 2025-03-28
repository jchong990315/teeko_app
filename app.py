from flask import Flask, render_template, request, jsonify
from teeko_ai import TeekoPlayer

app = Flask(__name__)
ai = TeekoPlayer()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ai-move', methods=['POST'])
def ai_move():
    data = request.get_json()
    board = data['board']
    move = ai.make_move(board)
    ai.place_piece(move, ai.my_piece)
    return jsonify({'move': move})

if __name__ == '__main__':
    app.run(debug=True)

